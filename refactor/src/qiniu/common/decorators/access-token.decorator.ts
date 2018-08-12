import { createParamDecorator } from '@nestjs/common';
import * as qiniu from 'qiniu';
import * as data from './config.json';

export const AccessToken = createParamDecorator((uri, req) => {
  return qiniu.util.generateAccessToken(data as any, uri);
});
