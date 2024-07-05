import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AssetLogService } from './asset-log.service';
import { CreateLogDto } from './dtos/create-asset-log.dto';
import { Log } from './entities/log.entity';
import { AssetType } from '../common/enums/asset-type';
import { Period } from '../common/enums/period';
import { TrendingAssetDto } from './dtos/trending-asset.dto';
import { RabbitmqService } from '../../rabbitmq/rabbitmq.service';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('asset-log')
export class AssetLogController {
  constructor(
    private service: AssetLogService,
    private rabbitMQService: RabbitmqService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'a log is successfully created',
  })
  @Post()
  async logSearch(@Body() createLogDto: CreateLogDto): Promise<void> {
    await this.rabbitMQService.sendMessage(createLogDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Receiving a list of trending assets for a specific period',
    type: [TrendingAssetDto],
  })
  @ApiResponse({
    status: 400,
    description: 'an exception is thrown when something went wrong',
    type: HttpException,
  })
  @ApiQuery({ name: 'asset_type', required: false, type: String })
  @Get('trending')
  async getTrendingSearches(
    @Query('period') period: Period,
    @Query('asset_type') asset_type?: AssetType,
  ): Promise<TrendingAssetDto[] | Error> {
    if (!period || period === undefined)
      throw new HttpException('period is required', HttpStatus.BAD_REQUEST);

    return await this.service.getTrendingSearches(period, asset_type);
  }

  @ApiResponse({
    status: 200,
    description: 'Receiving a list of logs for a specific user',
    type: () => [Log],
  })
  @ApiResponse({
    status: 400,
    description: 'an exception is thrown when something went wrong',
    type: HttpException,
  })
  @Get('recent')
  async getRecentSearches(
    @Query('user_id') user_id: number,
  ): Promise<Log[] | Error> {
    if (!user_id)
      throw new HttpException(
        'user_id query parameter is missing',
        HttpStatus.BAD_REQUEST,
      );

    return await this.service.getRecentSearches(user_id);
  }
}
