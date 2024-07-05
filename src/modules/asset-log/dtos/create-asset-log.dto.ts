import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AssetType } from '../../common/enums/asset-type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLogDto {
  @ApiProperty({
    description: 'the id of the user which the log is referring to',
    example: 3,
  })
  @IsNotEmpty({ message: 'user_id must be filled in' })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: 'the id of the asset which the log is referring to',
    example: 20,
  })
  @IsNotEmpty({ message: 'asset_id must be filled in' })
  @IsNumber()
  asset_id: number;

  @ApiProperty({
    description: 'the asset type of the referred asset in the log',
    enum: AssetType,
  })
  @IsEnum(AssetType, { message: 'asset_type must be a valid enum value' })
  @IsNotEmpty({ message: 'asset_type is required' })
  @IsString()
  asset_type: AssetType;
}
