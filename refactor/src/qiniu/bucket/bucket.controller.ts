import { Controller, Get, Req, Post, Body, UseFilters, UseInterceptors, Res } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { HttpExceptionFilter } from '../../common/exceptions/http-exception.filter';
// import { ForbiddenException } from '../../common/exceptions/forbidden.exception';
import { AccessToken } from '../common/decorators/access-token.decorator';
import * as config from './config.json';
import { BucketInterceptor } from './bucket.interceptor';

const { getUri } = (config as any);

// 控制器层负责处理传入的请求, 并返回对客户端的响应。
@UseFilters(HttpExceptionFilter)
@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}
  @Post()
  create() {
    return ['ok'];
  }

  @UseInterceptors(BucketInterceptor)
  @Get()
  async findAll(@AccessToken(getUri) token: string) {
    return await this.bucketService
      .findAll(getUri, token)
      .toPromise()
      .then(({ data }) => data);
  }
}