import { Injectable, HttpService, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Bucket } from './interfaces/bucket.interface';
import { ForbiddenException } from '../../common/exceptions/forbidden.exception';

// 控制器应处理 HTTP 请求并将更复杂的任务委托给服务
@Injectable()
export class BucketService {
  constructor(private readonly httpService: HttpService) {}
  create(bucket: Bucket) {
    // if (!bucket.name) {
    //   throw new HttpException({
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'This is a custom message',
    //   }, 403);
    // }
    return 'ok';
  }
  findAll(uri: string, token: string): Observable<AxiosResponse<string[]>> {
    return this.httpService.get(uri, {
        headers: {
          authorization: token,
      },
    });
  }
}