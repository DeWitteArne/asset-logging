import {
  Column,
  JoinColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccessedLog } from '../../accessed-log/entities/accessed-log.entity';
import { AssetType } from '../../common/enums/asset-type';
import { ApiProperty } from '@nestjs/swagger';

@Entity('logs')
export class Log {
  @ApiProperty({ description: 'the id of the asset log', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'the id of the asset which the log is referring to',
    example: 20,
  })
  @Column({ nullable: false })
  asset_id: number;

  @ApiProperty({
    description: 'the id of the user which the log is referring to',
    example: 3,
  })
  @Column({ nullable: false })
  user_id: number;

  @ApiProperty({
    description: 'the date when the log was last updated',
    example: '2024-07-04T12:00:00.000Z',
  })
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updated_at: Date;

  @ApiProperty({
    description: 'the asset type of the referred asset in the log',
    type: AssetType,
  })
  @Column({
    type: 'enum',
    enum: AssetType,
  })
  asset_type: AssetType;

  @ApiProperty({
    description:
      'A list of opf timing that indicate when the asset was accessed',
    type: [AccessedLog],
  })
  @OneToMany(() => AccessedLog, (accessedLog) => accessedLog.log)
  @JoinColumn({ name: 'id', referencedColumnName: 'log_id' })
  access_timings: AccessedLog[];
}
