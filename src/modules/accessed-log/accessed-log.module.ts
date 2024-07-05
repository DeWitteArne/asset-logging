import { Module } from '@nestjs/common';
import { AccessedLogRepository } from './accessed-log.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessedLog } from './entities/accessed-log.entity';
import { Log } from '../asset-log/entities/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessedLog, Log])],
  providers: [AccessedLogRepository],
  exports: [TypeOrmModule, AccessedLogRepository],
})
export class AccessedLogModule {}
