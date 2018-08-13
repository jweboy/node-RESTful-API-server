import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class BucketRequestMiddlware implements NestMiddleware {
  resolve(): MiddlewareFunction {
    return (req, res, next) => {
      // console.log(JSON.stringify(req.headers, null, 4));
      next();
    };
  }
}