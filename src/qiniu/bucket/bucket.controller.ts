import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  HttpCode,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import * as url from 'url';
import { BucketService } from './bucket.service';
import {
  AccessToken,
  getAccessToken,
} from '../../common/decorators/access-token.decorator';
import { BucketInterceptor } from './bucket.interceptor';
import { CreateBucketDto, DeleteBucketDto } from './dto/bucket.dto';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { encode } from '../../common/util/base64-url';
import * as config from '../../common/config/qiniu-bucket.json';

const { getUri, postUri } = config as any;

// 控制器层负责处理传入的请求, 并返回对客户端的响应。

@ApiUseTags('qiniu')
@Controller('qiniu/bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  // TODO: createBucket.name需要正则匹配 仅支持字母、短划线-、下划线_、数字的组合。
  @Post()
  @UsePipes(ValidationPipe)
  createOne(@Body() createBucket: CreateBucketDto) {
    const region = createBucket.region || 'z0';
    const fullUri = url.resolve(
      postUri,
      `/mkbucketv2/${encode(createBucket.name)}/region/${region}`,
    );
    const token = getAccessToken(fullUri);
    return this.bucketService
      .createOne(fullUri, token)
      .toPromise()
      .then(() => '');
    // .catch(err => { throw err; });
  }

  @UseInterceptors(BucketInterceptor)
  @Get()
  findAll(@AccessToken(getUri) token: string) {
    return this.bucketService
      .findAll(getUri, token)
      .toPromise()
      .then(({ data }) => data);
    // .catch(err => { throw err; });
  }

  @Delete(':name')
  @HttpCode(204)
  delete(@Param() params: DeleteBucketDto) {
    const name = params.name;
    const fullUri = url.resolve(postUri, `/drop/${name}`);
    const token = getAccessToken(fullUri);
    return this.bucketService
      .delete(fullUri, token)
      .toPromise()
      .then(() => '');
    // .catch(err => { throw err; });
  }
}
