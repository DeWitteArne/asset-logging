import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TrendingAssetDto {
  @ApiProperty({
    description: 'the id of the asset which the log is referring to',
    example: 20,
  })
  @IsNotEmpty()
  @IsNumber()
  asset_id: number;

  @ApiProperty({
    description: 'the amount of logs',
    example: 450,
  })
  @IsNotEmpty()
  @IsNumber()
  count: number;
}
