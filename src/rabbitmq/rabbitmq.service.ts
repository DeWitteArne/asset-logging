import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqplib from 'amqplib';
import { AssetLogService } from '../modules/asset-log/asset-log.service';
import { CreateLogDto } from '../modules/asset-log/dtos/create-asset-log.dto';

@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {
  private connection;
  private channel;
  private queue: string;

  constructor(private assetLogService: AssetLogService) {}

  async onModuleInit() {
    await this.connect();

    await this.consumeMessages();
  }

  async onModuleDestroy() {
    await this.close();
  }

  private async connect() {
    try {
      console.log('Connecting to RabbitMQ...');

      this.connection = await amqplib.connect(process.env.AMQP_URI);
      this.channel = await this.connection.createChannel();

      this.queue = process.env.AMQP_QUEUE;
      await this.channel.assertQueue(this.queue);

      console.log('Connection to RabbitMQ established!');
    } catch (e) {
      console.error('Failed to connect to RabbitMQ: ', e);
      throw e;
    }
  }

  public async sendMessage(message: any) {
    try {
      if (!this.channel)
        throw new Error('Channel is not created. Call connect() first.');

      console.log('Sending message to RabbitMQ...');

      const buffer = Buffer.from(JSON.stringify(message));

      this.channel.sendToQueue(this.queue, buffer);

      console.log('Message send to RabbitMQ');
    } catch (e) {
      console.error('Failed to connect to RabbitMQ');
      throw e;
    }
  }

  private async consumeMessages() {
    try {
      if (!this.channel)
        throw new Error('Channel is not created. Call connect() first.');

      console.log('Consuming messages from RabbitMQ...');

      await this.channel.consume(this.queue, async (msg) => {
        if (msg !== null) {
          const messageContent = msg.content.toString();
          const createLogDto: CreateLogDto = JSON.parse(messageContent);

          try {
            await this.assetLogService.create(createLogDto);
          } catch (e) {
            console.error('Failed to create asset log for incoming message', e);
          }

          this.channel.ack(msg);
        }
      });

      console.log('Consumer set up successfully');
    } catch (e) {
      console.error('Failed to consume messages from RabbitMQ', e);
      throw e;
    }
  }

  private async close() {
    try {
      console.log('Closing connection to RabbitMQ...');

      if (this.channel) await this.channel.close();

      if (this.connection) await this.connection.close();

      console.log('Connection to RabbitMQ closed!');
    } catch (e) {
      console.error('Failed to close RabbitMQ connection', e);
      throw e;
    }
  }
}
