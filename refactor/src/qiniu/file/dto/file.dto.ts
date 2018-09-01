import { IsString } from 'class-validator';

export class UploadFileDto {
    @IsString()
    readonly bucket: string;

}