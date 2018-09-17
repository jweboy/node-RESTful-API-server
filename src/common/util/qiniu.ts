import * as qiniu from 'qiniu';
import * as path from 'path';
import { streamifier } from './streamifier';
import { ConfigService } from '../../config/config.service';

function responseHandler(resolve, reject, { respErr, respBody, respInfo }) {
  if (respErr) {
    reject(respErr);
  } else if (respInfo.statusCode !== 200) {
    const err = new Error();
    err.message = `${respInfo.statusCode} error`;
    reject(err);
  } else {
    resolve(respBody);
  }
}

// 密钥串
// qiniu.conf.ACCESS_KEY = accessKey;
// qiniu.conf.SECRET_KEY = secretKey;

interface UploadOptions {
  scope: string;
  expires?: number;
  returnBody?: string;
}

interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
}

const envDir = path.join(__dirname, '../env/qiniu.env');
const configService = new ConfigService(envDir);

export default class Qiniu {
  constructor(
    private readonly accessKey: string = configService.envConfig
      .QINIU_ACCESSKEY,
    private readonly secretKey: string = configService.envConfig
      .QINIU_SECRETKEY,
  ) {}
  /**
   * 鉴权对象
   */
  mac() {
    return new qiniu.auth.digest.Mac(this.accessKey, this.secretKey);
  }
  config() {
    const config = new qiniu.conf.Config();

    // 空间对应的机房
    // config.zone = qiniu.zone.Zone_na0;

    return config;
  }
  bucketManager() {
    const bucketManager = new qiniu.rs.BucketManager(this.mac(), this.config());
    return bucketManager;
  }
  /**
   * 通用上传token
   * @param options
   */
  // TODO: token根据时间来判断 不需要每次都生成
  uploadToken(options: UploadOptions) {
    const defaultOptions = {
      scope: '',
      expires: 7200,
      returnBody:
        '{"name":"$(key)","hash":"$(etag)","size":$(fsize),"bucket":"$(bucket)"}',
    };
    const mac = this.mac();
    const putPolicy = new qiniu.rs.PutPolicy({
      ...defaultOptions,
      ...options,
    });
    const uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
  }
  /**
   * 文件上传
   * @param bucket
   * @param file
   */
  // TODO: 需要限制文件大小
  uploadFile(bucket: string, file: File) {
    const { buffer, originalname } = file;
    const config = this.config();
    const uploadToken = this.uploadToken({ scope: bucket });
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();
    const readstream = streamifier.createReadStream(buffer);
    const encodeFileName = encodeURI(originalname);

    return new Promise((resolve, reject) => {
      formUploader.putStream(
        uploadToken,
        encodeFileName,
        readstream,
        putExtra,
        (respErr, respBody, respInfo) =>
          responseHandler(resolve, reject, { respErr, respBody, respInfo }),
      );
    });
  }
  /**
   * 获取指定bucket的文件列表
   * @param opts
   */
  getFiles(opts) {
    const bucketManager = this.bucketManager();
    const { bucket, ...otherProps } = opts;

    return new Promise((resolve, reject) => {
      bucketManager.listPrefix(
        bucket,
        otherProps,
        (respErr, respBody, respInfo) =>
          responseHandler(resolve, reject, { respErr, respBody, respInfo }),
      );
    });
  }
  /**
   * 删除指定镜像空间中的文件
   * @param name 需要删除的文件名称
   * @param bucket 文件保存的镜像空间名称
   */
  deleteFile(name: string, bucket: string) {
    const bucketManager = this.bucketManager();

    return new Promise((resolve, reject) => {
      bucketManager.delete(bucket, name, (respErr, respBody, respInfo) =>
        responseHandler(resolve, reject, { respErr, respBody, respInfo }),
      );
    });
  }
}
