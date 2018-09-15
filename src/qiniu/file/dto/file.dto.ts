import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class GetFileDto {
  @ApiModelProperty({
    description: '文件存储的镜像空间名',
  })
  @IsString()
  readonly bucket: string;

  @ApiModelProperty({
    description: '页码',
  })
  @IsString()
  readonly page: number;

  @ApiModelProperty({
    description: '页数',
  })
  @IsString()
  readonly size: number;
}

export class PostFileDto {
  @ApiModelProperty()
  @IsString()
  readonly bucket: string;
}

export class DeleteFileDto {
  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelProperty()
  @IsString()
  readonly bucket: string;
}
