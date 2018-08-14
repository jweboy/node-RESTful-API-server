import { IsString } from 'class-validator';

export class CreateBucketDto {
    @IsString() readonly name: string;
}