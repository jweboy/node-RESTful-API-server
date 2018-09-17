import { createParamDecorator } from '@nestjs/common';
import * as qiniu from 'qiniu';
import * as path from 'path';
import { ConfigService } from '../../config/config.service';

export const getAccessToken = (uri: string): string => {
  const envFile = path.join(__dirname, '../env/qiniu.env');
  const configService = new ConfigService(envFile);

  return qiniu.util.generateAccessToken(
    {
      accessKey: configService.envConfig.QINIU_ACCESSKEY,
      secretKey: configService.envConfig.QINIU_SECRETKEY,
    },
    uri,
  );
};

export const AccessToken = createParamDecorator(uri => getAccessToken(uri));
