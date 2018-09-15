import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  FileInterceptor,
  Body,
  UsePipes,
  Get,
  Query,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { GetFileDto, PostFileDto, DeleteFileDto } from './dto/file.dto';
import { ValidationPipe } from '../../common/pipes/validation.pipe';

@ApiUseTags('qiniu')
@Controller('qiniu/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(ValidationPipe)
  postOne(@Body() body: PostFileDto, @UploadedFile() file) {
    const { bucket } = body;

    return this.fileService.postOne(bucket, file);
  }

  @Get()
  @UsePipes(ValidationPipe)
  getAll(@Query() query: GetFileDto) {
    return this.fileService.getAll(query);
  }

  @HttpCode(204)
  @Delete()
  @UsePipes(ValidationPipe)
  deleteOne(@Body() body: DeleteFileDto) {
    const { name, bucket } = body;

    return this.fileService.deleteOne(name, bucket);
  }
}
