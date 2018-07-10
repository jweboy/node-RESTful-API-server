// const qiniu = require('qiniu')
import * as qiniu from 'qiniu'
import request from './request'
const config = require('../config/qiniu')

const accessKey = config.accessKey || process.env.QINIU_ACCESS_KEY
const secretKey = config.secretKey || process.env.QINIU_SECRET_KEY

// https://www.npmjs.com/package/http-errors

export default class Qianiu {
    constructor(accessKey: string, secretKey: string) {
        console.log(accessKey, secretKey)
    }
    /**
     * create
     */
    public create() {
        return new Qianiu(accessKey, secretKey)
    }
    public getUploadToken(bucket?: string) {
        const opts = {
            scope: bucket,
            expires: 7200 // 有效期2小时
        }
        const putPolicy = new qiniu.rs.PutPolicy(opts)
        const token = putPolicy.uploadToken()
        return token
    }
    public getAccessToken() {
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
