import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBucketDto {
  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelProperty({
    default: 'z0',
    description:
      '存储区域,默认有(华东)z0、(华北)z1、(华南)z2、(北美)na0、(东南亚)as0',
  })
  @IsString()
  readonly region?: string;
}

export class DeleteBucketDto {
  @ApiModelProperty()
  @IsString()
  readonly name: string;
}
