import { IsString } from 'class-validator';

export class UploadFileDto {
    @IsString()
    readonly bucket: string;

}

export class DeleteFileDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly bucket: string;

}