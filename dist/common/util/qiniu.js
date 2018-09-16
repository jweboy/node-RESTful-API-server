"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const qiniu = require("qiniu");
const data = require("../config/qiniu-key.json");
const streamifier_1 = require("./streamifier");
const { accessKey, secretKey } = data;
function responseHandler(resolve, reject, { respErr, respBody, respInfo }) {
    if (respErr) {
        reject(respErr);
    }
    else if (respInfo.statusCode !== 200) {
        const err = new Error();
        err.message = `${respInfo.statusCode} error`;
        reject(err);
    }
    else {
        resolve(respBody);
    }
}
class Qiniu {
    constructor() { }
    mac() {
        return new qiniu.auth.digest.Mac(accessKey, secretKey);
    }
    config() {
        const config = new qiniu.conf.Config();
        return config;
    }
    bucketManager() {
        const bucketManager = new qiniu.rs.BucketManager(this.mac(), this.config());
        return bucketManager;
    }
    uploadToken(options) {
        const defaultOptions = {
            scope: '',
            expires: 7200,
            returnBody: '{"name":"$(key)","hash":"$(etag)","size":$(fsize),"bucket":"$(bucket)"}',
        };
        const mac = this.mac();
        const putPolicy = new qiniu.rs.PutPolicy(Object.assign({}, defaultOptions, options));
        const uploadToken = putPolicy.uploadToken(mac);
        return uploadToken;
    }
    uploadFile(bucket, file) {
        const { buffer, originalname } = file;
        const config = this.config();
        const uploadToken = this.uploadToken({ scope: bucket });
        const formUploader = new qiniu.form_up.FormUploader(config);
        const putExtra = new qiniu.form_up.PutExtra();
        const readstream = streamifier_1.streamifier.createReadStream(buffer);
        const encodeFileName = encodeURI(originalname);
        return new Promise((resolve, reject) => {
            formUploader.putStream(uploadToken, encodeFileName, readstream, putExtra, (respErr, respBody, respInfo) => responseHandler(resolve, reject, { respErr, respBody, respInfo }));
        });
    }
    getFiles(opts) {
        const bucketManager = this.bucketManager();
        const { bucket } = opts, otherProps = __rest(opts, ["bucket"]);
        return new Promise((resolve, reject) => {
            bucketManager.listPrefix(bucket, otherProps, (respErr, respBody, respInfo) => responseHandler(resolve, reject, { respErr, respBody, respInfo }));
        });
    }
    deleteFile(name, bucket) {
        const bucketManager = this.bucketManager();
        return new Promise((resolve, reject) => {
            bucketManager.delete(bucket, name, (respErr, respBody, respInfo) => responseHandler(resolve, reject, { respErr, respBody, respInfo }));
        });
    }
}
exports.default = Qiniu;
//# sourceMappingURL=qiniu.js.map