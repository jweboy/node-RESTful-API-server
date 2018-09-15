import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor() {
    super('请求参数不全导致错误', HttpStatus.BAD_REQUEST);
  }
}