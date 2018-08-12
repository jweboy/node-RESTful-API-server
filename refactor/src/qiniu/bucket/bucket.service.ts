import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as qiniu from 'qiniu';
// import { getUrl } from './config.json';

// 控制器应处理 HTTP 请求并将更复杂的任务委托给服务

@Injectable()
export class BucketService {
  constructor(private readonly httpService: HttpService) {}
  // create(bucket: Bucket) {
  //   this.buckets.push(bucket);
  // }
  findAll(uri: string, token: string): Observable<AxiosResponse<string[]>> {
    return this.httpService.get(uri, {
        headers: {
          authorization: token,
      },
    });
  }
}