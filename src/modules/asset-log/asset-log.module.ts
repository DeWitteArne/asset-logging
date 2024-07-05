import { forwardRef, Module } from '@nestjs/common';
import { AssetLogService } from './asset-log.service';
import { AssetLogController } from './asset-log.controller';
import { AssetLogRepository } from './asset-log.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { AccessedLogModule } from '../accessed-log/accessed-log.module';
import { AccessedLog } from '../accessed-log/entities/accessed-log.entity';
import { RabbitmqModule } from '../../rabbitmq/rabbitmq.module';

@Module({
  imports: [
    AccessedLogModule,
    forwardRef(() => RabbitmqModule),
    TypeOrmModule.forFeature([Log, AccessedLog]),
  ],
  exports: [TypeOrmModule, AssetLogService],
  providers: [AssetLogService, AssetLogRepository],
  controllers: [AssetLogController],
})
export class AssetLogModule {}
