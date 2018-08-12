import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import * as qiniu from 'qiniu';

@Injectable()
export class BucketRequestMiddlware implements NestMiddleware {
  resolve(uri: string): MiddlewareFunction {
    return (req, res, next) => {
      // const token = qiniu.util.generateAccessToken({
      //   secretKey: 'KgNS98Sj66CuXFi64xNHs11vfrO8iXmX8Zcht-Id',
      //   accessKey: 'gohLJusvDqZcwwYaL_DcF-KeTDX65zDdEzaEyayP',
      // }, uri);
      // res.set('Authorization', token);
      // console.log(JSON.stringify(req.headers, null, 4));
      next();
    };
  }
}