import { Injectable } from '@nestjs/common';
import { AssetLogRepository } from './asset-log.repository';
import { CreateLogDto } from './dtos/create-asset-log.dto';
import { Log } from './entities/log.entity';
import { AccessedLogRepository } from '../accessed-log/accessed-log.repository';
import { AssetType } from '../common/enums/asset-type';
import { Period, transformPeriodToDate } from '../common/enums/period';
import { TrendingAssetDto } from './dtos/trending-asset.dto';

@Injectable()
export class AssetLogService {
  constructor(
    private repository: AssetLogRepository,
    private accessedLogRepository: AccessedLogRepository,
  ) {}

  async create(createLogDto: CreateLogDto): Promise<void> {
    const { user_id, asset_id } = createLogDto;
    const foundLog = await this.repository.findOneByUserAndAsset(
      user_id,
      asset_id,
    );

    if (foundLog) {
      await this.accessedLogRepository.create(foundLog.id);
      await this.repository.updateLogTime(foundLog.id);
      return;
    }

    const newLog: Log = await this.repository.create(createLogDto);
    await this.accessedLogRepository.create(newLog.id);
  }

  async getTrendingSearches(
    period: Period,
    asset_type?: AssetType,
  ): Promise<TrendingAssetDto[]> {
    const from = transformPeriodToDate(period);
    return this.repository.findPopularLogs(from, asset_type);
  }

  async getRecentSearches(user_id: number): Promise<Log[]> {
    return this.repository.findAllByUser(user_id);
  }

  async remove(user_id: number, asset_id: number): Promise<void> {
    await this.repository.remove(user_id, asset_id);
  }
}
