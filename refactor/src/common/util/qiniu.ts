import * as qiniu from 'qiniu';
import * as data from '../config.json';
import { streamifier } from './streamifier';
import { resolve } from 'dns';
import { reject } from 'bluebird';

const { accessKey, secretKey } = (data as any);

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

interface File{
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
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
            // returnBody: `{"name":"$(key)","hash": "$(etag)","bucket":"$(bucket)}`,
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
    // TODO: 需要增加数据库
    uploadFile(bucket: string, file: File) {
        const { buffer, fieldname } = file;
        const config = this.config();
        const uploadToken = this.uploadToken({ scope: bucket });
        const formUploader = new qiniu.form_up.FormUploader(config);
        const putExtra = new qiniu.form_up.PutExtra();
        const readstream = streamifier.createReadStream(buffer);

        return new Promise((resolve, reject) => {
            formUploader.putStream(uploadToken, fieldname, readstream, putExtra,
                (respErr, respBody, respInfo) => responseHandler(resolve, reject, {respErr, respBody, respInfo }));
        });
    }
    /**
     * 获取指定bucket的文件列表
     * @param opts
     */
    // TODO: 需要增加保存数据库并分页
    getFiles(opts) {
        const bucketManager = this.bucketManager();
        const { bucket, ...otherProps } = opts;

        return new Promise((resolve, reject) => {
            bucketManager.listPrefix(bucket, otherProps,
                (respErr, respBody, respInfo) => responseHandler(resolve, reject, {respErr, respBody, respInfo }));
        });
    }
}
