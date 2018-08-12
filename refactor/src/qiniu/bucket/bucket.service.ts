import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as qiniu from 'qiniu';
import axios, { AxiosResponse } from 'axios';
// import { getUrl } from './config.json';

// 控制器应处理 HTTP 请求并将更复杂的任务委托给服务

@Injectable()
export class BucketService {
  constructor(private readonly httpService: HttpService) {}
  private readonly getUri: string = 'https://rs.qbox.me/buckets';
  // create(bucket: Bucket) {
  //   this.buckets.push(bucket);
  // }
  findAll(): Observable<AxiosResponse> {
    const token = qiniu.util.generateAccessToken({
      secretKey: 'gohLJusvDqZcwwYaL_DcF-KeTDX65zDdEzaEyayP',
      accessKey: 'KgNS98Sj66CuXFi64xNHs11vfrO8iXmX8Zcht-Id',
    }, this.getUri);
    return this.httpService.get(this.getUri, {
        headers: {
          authorization: token,
      },
    });
  }
}