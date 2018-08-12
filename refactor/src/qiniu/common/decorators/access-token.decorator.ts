import { createParamDecorator } from '@nestjs/common';
import * as qiniu from 'qiniu';

export const AccessToken = createParamDecorator((uri, req) => {
  return qiniu.util.generateAccessToken({
    secretKey: 'gohLJusvDqZcwwYaL_DcF-KeTDX65zDdEzaEyayP',
    accessKey: 'KgNS98Sj66CuXFi64xNHs11vfrO8iXmX8Zcht-Id',
  }, uri);
});
