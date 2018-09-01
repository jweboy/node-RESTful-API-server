import { Controller, Post, UploadedFile, UseInterceptors, FileInterceptor, Body, UsePipes } from '@nestjs/common';
import { FileService } from './file.service';
import { UploadFileDto } from './dto/file.dto';
import { ValidationPipe } from '../../common/pipes/validation.pipe';

@Controller('qiniu/file')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @UsePipes(ValidationPipe)
    upload(@Body() body: UploadFileDto, @UploadedFile() file) {
        const { bucket } = body;

        return this.fileService.upload(bucket, file);
    }
}