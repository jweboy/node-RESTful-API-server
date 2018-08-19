import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // TODO: 这里需要扩展七牛云大于500的状态码

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
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