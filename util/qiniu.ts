// const qiniu = require('qiniu')
import * as qiniu from 'qiniu'
import request from './request'
const config = require('../config/qiniu')

export default class Qiniu {
    private accessKey: string
    private secretKey: string
    private mac: qiniu.auth.digest.Mac
    constructor(accessKey: string, secretKey: string) {
        this.accessKey = config.accessKey || process.env.QINIU_ACCESS_KEY
        this.secretKey = config.secretKey || process.env.QINIU_SECRET_KEY
        // 上传客户端
        this.mac = new qiniu.auth.digest.Mac(this.accessKey, this.secretKey)
    }
    /**
     * create
     */
    static create() {
        return new Qiniu(config.accessKey, config.secretKey)
    }
    getUploadToken(bucket?: string) {
        const opts = {
            scope: bucket,
            expires: 7200 // 有效期2小时
        }
        const putPolicy = new qiniu.rs.PutPolicy(opts)
        const token = putPolicy.uploadToken(this.mac)
        return token
    }
    getAccessToken() {
        return request({
            method: 'POST',
            uri: 'https://acc.qbox.me/oauth2/token',
            json: true,
            form: {
                username: config.username,
                password: config.password,
                grant_type: config.grantType
            }
        })  
    }
}
