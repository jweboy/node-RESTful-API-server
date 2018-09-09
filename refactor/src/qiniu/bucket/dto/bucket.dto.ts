import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBucketDto {
    @ApiModelProperty()
    @IsString()
    readonly name: string;

    @ApiModelProperty()
    @IsString()
    readonly region: string;
}

export class DeleteBucketDto {
    @ApiModelProperty()
    @IsString()
    readonly name: string;
}