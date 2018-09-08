import * as qiniu from 'qiniu'
import * as url from 'url'
import * as base64Url from 'base64-url'
import config from 'config/qiniu'

// process.env.QINIU_ACCESS_KEY
// process.env.QINIU_SECRET_KEY

export default class Qiniu {
    public static create() {
        return new Qiniu(config.accessKey, config.secretKey)
    }
    private accessKey: string
    private secretKey: string
    // private mac: qiniu.auth.digest.Mac
    constructor(accessKey: string, secretKey: string) {
        this.accessKey = config.accessKey
        this.secretKey = config.secretKey
        // 上传客户端
        // this.mac = new qiniu.auth.digest.Mac(this.accessKey, this.secretKey)
    }
    public getBucket() {
        const uri = 'https://rs.qbox.me/buckets'
        request({
            uri,
            headers: {
                authorization: this.getAccessToken(uri),
            },
        })
        .then((data) => {
            console.dir(data)
        })
    }
    public deleteBucket(bucketName: string) {
        const uri = 'https://rs.qiniu.com'
        const fullUri = url.resolve(uri, `/drop/${bucketName}`)
        return request({
            method: 'POST',
            uri: fullUri,
            headers: {
                authorization: this.getAccessToken(fullUri),
            },
        })
    }
    // private getUploadToken(bucket?: string) {
    //     const opts = {
    //         scope: bucket,
    //         expires: 7200 // 有效期2小时
    //     }
    //     const putPolicy = new qiniu.rs.PutPolicy(opts)
    //     const token = putPolicy.uploadToken(this.mac)
    //     return token
    // }
    // private getAuthToken() {
    //     return request({
    //         method: 'POST',
    //         uri: 'https://acc.qbox.me/oauth2/token',
    //         form: {
    //             username: config.username,
    //             password: config.password,
    //             grant_type: config.grantType
    //         }
    //     })
    // }
    public postBucket(bucketName: string, region: string = 'z0') {
        // TODO: bucket名字的规则需要测试加一些验证
        const uri = `https://rs.qiniu.com`
        const encodeBucketName = base64Url.encode(bucketName)
        const fullUri = url.resolve(uri, `/mkbucketv2/${encodeBucketName}/region/${region}`)

        return request({
            method: 'POST',
            uri: fullUri,
            headers: {
                authorization: this.getAccessToken(fullUri),
            },
        })
    }
    private getAccessToken(uri: string, body?: string): string {
        return qiniu.util.generateAccessToken({
            secretKey: this.secretKey,
            accessKey: this.accessKey,
        }, uri, body)
    }
}
