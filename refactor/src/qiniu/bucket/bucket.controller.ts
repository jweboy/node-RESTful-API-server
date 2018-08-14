import { Controller, Get, Post, Body, UseFilters, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from '../../common/exceptions/http-exception.filter';
import { BucketService } from './bucket.service';
import { AccessToken } from '../common/decorators/access-token.decorator';
import * as config from './config.json';
import { BucketInterceptor } from './bucket.interceptor';
import { CreateBucketDto } from './dto/bucket.dto';
import { ForbiddenException } from '../../common/exceptions/forbidden.exception';

const { getUri } = (config as any);

// 控制器层负责处理传入的请求, 并返回对客户端的响应。
// @UseFilters(HttpExceptionFilter)
@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}
  @Post()
  create(@Body() createBucket: CreateBucketDto) {
    console.log(2, createBucket);
    if (!createBucket.name) {
      throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
    }
    // return this.bucketService.create(createBucket);
  }

  @UseInterceptors(BucketInterceptor)
  @Get()
  async findAll(@AccessToken(getUri) token: string) {
    // return await this.bucketService
    //   .findAll(getUri, token)
    //   .toPromise()
    //   .then(({ data }) => data);
    throw new ForbiddenException();
  }
}