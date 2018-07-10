import * as qiniu from 'qiniu'
import * as url from 'url'
import * as base64Url from 'base64-url'
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
    getAuthToken() {
        return request({
            method: 'POST',
            uri: 'https://acc.qbox.me/oauth2/token',
            form: {
                username: config.username,
                password: config.password,
                grant_type: config.grantType
            }
        })  
    }
    private getAccessToken(uri: string, body?: string): string {
        return qiniu.util.generateAccessToken({
            secretKey: this.secretKey,
            accessKey: this.accessKey
        }, uri, body)
    }
    postBucket(bucketName: string, region: string = 'z0') {
        // TODO: bucket名字的规则需要测试加一些验证
        const uri = `https://rs.qiniu.com`
        const encodeBucketName = base64Url.encode(bucketName)
        const fullUri = url.resolve(uri, `/mkbucketv2/${encodeBucketName}/region/${region}`)

        return request({
            method: 'POST',
            uri: fullUri,
            headers:{
                Authorization: this.getAccessToken(fullUri)
            }
        })
    }
    getBucket() {
        const uri = 'https://rs.qbox.me/buckets'
        return request({
            uri,
            headers: {
                Authorization: this.getAccessToken(uri)
            }
        }) 
    }
    deleteBucket(bucketName: string) {
        const uri = 'https://rs.qiniu.com'
        const fullUri = url.resolve(uri, `/drop/${bucketName}`)
        return request({
            method: 'POST',
            uri: fullUri,
            headers: {
                Authorization: this.getAccessToken(fullUri)
            }
        })
    }
}
