import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

const extendedStatusHashTable = {
  631: '指定空间不存在',
  614: '目标资源已存在',
};

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // FIXME: 暂时针对七牛云拓展的状态码的解决方案
    // console.log('qiniu status:', status);

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (~error.message.indexOf('614')) {
        response
          .status(614)
          .json({
            statusCode: 614,
            message: extendedStatusHashTable['614'],
            error: 'Target resource already exists',
            timestamp: new Date().toISOString(),
            path: request.url,
          });
      }
      if (~error.message.indexOf('631')) {
        response
          .status(631)
          .json({
            statusCode: 631,
            message: extendedStatusHashTable['631'],
            error: 'The specified space does not exist',
            timestamp: new Date().toISOString(),
            path: request.url,
          });
      }
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: '服务器情请求错误',
          error: 'Internal Server Error',
          timestamp: new Date().toISOString(),
          path: request.url,
        });
    } else {
      response
        .status(status)
        .json({
          ...error.message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
    }
  }
}