import * as qiniu from 'qiniu';
import * as data from '../config.json';
import { streamifier } from './streamifier';

const { accessKey, secretKey } = (data as any);

// 密钥串
// qiniu.conf.ACCESS_KEY = accessKey;
// qiniu.conf.SECRET_KEY = secretKey;

interface UploadOptions {
    scope: string;
    expires?: number;
    returnBody?: string;
}

export default class Qiniu {
    constructor(
    //     private readonly accessKey: string,
    ) {}
    /**
     * 鉴权对象
     */
    mac() {
        return new qiniu.auth.digest.Mac(accessKey, secretKey);
    }
    config() {
        const config = new qiniu.conf.Config();

        // 空间对应的机房
        // config.zone = qiniu.zone.Zone_na0;

        return config;
    }
    /**
     *
     * @param options
     */
    uploadToken(options: UploadOptions) {
        const defaultOptions = {
            scope: '',
            expires: 7200,
            // returnBody: `{"name":"$(key)","hash": "$(etag)","bucket":"$(bucket)}`,
        };
        const mac = this.mac();
        const putPolicy = new qiniu.rs.PutPolicy({
            ...defaultOptions,
            ...options,
        });
        console.log({
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
    // TODO: 请求参数增加验证类型
    uploadFile(bucket: string, file: object, cb: (respErr, respBody, respInfo) => void) {
        const config = this.config();
        const uploadToken = this.uploadToken({ scope: bucket });
        const formUploader = new qiniu.form_up.FormUploader(config);
        const putExtra = new qiniu.form_up.PutExtra();
        const readstream = streamifier.createReadStream(file.buffer);

        formUploader.putStream(uploadToken, 'file', readstream, putExtra, cb);
    }
}
