import { createParamDecorator } from '@nestjs/common';
import * as qiniu from 'qiniu';
import * as data from '../config/qiniu-key.json';

export const getAccessToken = (uri: string): string => qiniu.util.generateAccessToken(data as any, uri);

export const AccessToken = createParamDecorator((uri) => getAccessToken(uri));
