import { Controller, Get, Post, Body, Delete, Param, HttpCode, UseInterceptors, UsePipes } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { AccessToken } from '../common/decorators/access-token.decorator';
import { BucketInterceptor } from './bucket.interceptor';
import { CreateBucketDto } from './dto/bucket.dto';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import * as config from './config.json';
import { encode } from 'common/util/base64-url';
import * as url from 'url';
import * as qiniu from 'qiniu';
import * as data from '../common/decorators/config.json';

const { getUri, postUri } = (config as any);

// TODO: AccessToken需要封装传参公有化

// 控制器层负责处理传入的请求, 并返回对客户端的响应。
@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createBucket: CreateBucketDto) {
    const region = createBucket.region || 'z0';
    const fullUri = url.resolve(postUri, `/mkbucketv2/${encode(createBucket.name)}/region/${region}`);
    const token = qiniu.util.generateAccessToken(data as any, fullUri);
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
    const token = qiniu.util.generateAccessToken(data as any, fullUri);
    return this.bucketService
      .delete(fullUri, token)
      .toPromise()
      .then(() => '')
      .catch(err => { throw err; });
  }
}