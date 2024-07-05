import { forwardRef, Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { AssetLogModule } from '../modules/asset-log/asset-log.module';

@Module({
  providers: [RabbitmqService],
  exports: [RabbitmqService],
  imports: [forwardRef(() => AssetLogModule)],
})
export class RabbitmqModule {}
