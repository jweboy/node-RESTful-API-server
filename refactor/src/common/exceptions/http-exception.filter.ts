import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(expection: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    // const status = expection.getStatus();

    response
      // .status(status)
      .json({
        // statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
