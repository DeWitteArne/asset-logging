import {
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Entity,
} from 'typeorm';
import { Log } from '../../asset-log/entities/log.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('accessed_logs')
export class AccessedLog {
  @ApiProperty({
    description: 'the id of the accessed log',
    example: 2,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'the id of the log which the accessed log is referring to',
    example: 1,
  })
  @Column({ nullable: false })
  log_id: number;

  @ApiProperty({
    description: 'the date when the log was accessed',
    example: '2024-07-04T12:00:00.000Z',
  })
  @Column({ type: 'timestamp', name: 'access_time' })
  access_time: Date;

  @ApiProperty({
    description: 'the log object that is linked to this access log object',
    type: Log,
  })
  @ManyToOne(() => Log, (log) => log.access_timings)
  @JoinColumn({ name: 'log_id' })
  log: Log;
}
