import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessedLog } from './entities/accessed-log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccessedLogRepository {
  constructor(
    @InjectRepository(AccessedLog) private repository: Repository<AccessedLog>,
  ) {}

  async create(log_id: number): Promise<AccessedLog> {
    const now = new Date();
    const newItem: AccessedLog = this.repository.create({
      log_id,
      access_time: now,
    });

    return await this.repository.save(newItem);
  }

  async findByLogId(log_id: number): Promise<AccessedLog[]> {
    return this.repository.find({
      where: {
        log_id,
      },
    });
  }
}
