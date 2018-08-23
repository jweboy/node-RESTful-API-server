import { Controller, Post, UploadedFile, UseInterceptors, FileInterceptor } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('qiniu/file')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file) {
        console.log(file);
        // return this.fileService.upload();
    }
}