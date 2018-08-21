import { Controller, Get, Post, Body, Delete, Param, HttpCode, UseInterceptors, UsePipes } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { AccessToken, getAccessToken } from '../common/decorators/access-token.decorator';
import { BucketInterceptor } from './bucket.interceptor';
import { CreateBucketDto } from './dto/bucket.dto';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { encode } from '../../common/util/base64-url';
import * as config from './config.json';
import * as url from 'url';

const { getUri, postUri } = (config as any);

// 控制器层负责处理传入的请求, 并返回对客户端的响应。

@Controller('qiniu/bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createBucket: CreateBucketDto) {
    const region = createBucket.region || 'z0';
    const fullUri = url.resolve(postUri, `/mkbucketv2/${encode(createBucket.name)}/region/${region}`);
    const token = getAccessToken(fullUri);
    return this.bucketService
      .create(fullUri, token)
      .toPromise()
      .then(() => '')
      .catch(err => { throw err; });
  }

  @UseInterceptors(BucketInterceptor)
  @Get()
  findAll(@AccessToken(getUri) token: string) {
    return this.bucketService
      .findAll(getUri, token)
      .toPromise()
      .then(({ data }) => data)
      .catch(err => { throw err; });
  }

  @Delete(':name')
  @HttpCode(204)
  delete(@Param() params) {
    const name = params.name || '';
    const fullUri = url.resolve(postUri, `/drop/${name}`);
    const token = getAccessToken(fullUri);
    return this.bucketService
      .delete(fullUri, token)
      .toPromise()
      .then(() => '')
      .catch(err => { throw err; });
  }
}