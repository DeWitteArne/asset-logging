import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dtos/create-asset-log.dto';
import { AssetType } from '../common/enums/asset-type';
import { TrendingAssetDto } from './dtos/trending-asset.dto';

@Injectable()
export class AssetLogRepository {
  constructor(@InjectRepository(Log) private repository: Repository<Log>) {}

  async create(createLogDto: CreateLogDto): Promise<Log> {
    const newItem: Log = this.repository.create(createLogDto);

    return await this.repository.save(newItem);
  }

  async findOneByUserAndAsset(user_id: number, asset_id: number): Promise<Log> {
    return this.repository.findOne({
      where: {
        user_id,
        asset_id,
      },
    });
  }

  async findPopularLogs(
    from: Date,
    asset_type?: AssetType,
  ): Promise<TrendingAssetDto[]> {
    const queryBuilder = this.repository.createQueryBuilder('logs');
    if (asset_type)
      queryBuilder.where('logs.asset_type = :asset_type', { asset_type });

    queryBuilder.where('logs.updated_at >= :from', { from });

    const results = await queryBuilder
      .select('logs.asset_id as asset_id')
      .addSelect('COUNT(logs.asset_id)', 'count')
      .orderBy('count', 'DESC')
      .groupBy('logs.asset_id')
      .getRawMany();

    return results.map((result) => {
      return {
        asset_id: result.asset_id,
        count: parseInt(result.count),
      };
    });
  }

  async findAllByUser(user_id: number, limit: number = 100): Promise<Log[]> {
    return this.repository.find({
      where: {
        user_id,
      },
      order: {
        updated_at: 'DESC',
      },
      take: limit,
      relations: ['access_timings'],
    });
  }

  async updateLogTime(id: number): Promise<void> {
    const now = new Date();
    await this.repository.update(id, { updated_at: now });
  }

  async remove(user_id: number, asset_id): Promise<void> {
    await this.repository.delete({ user_id, asset_id });
  }
}
