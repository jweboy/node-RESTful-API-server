const qiniu = require('qiniu')
const { accessKey, secretKey } = require('../config/qiniu')

module.exports = class Qiniu {
  constructor (
    bucket = 'our-future'
  ) {
    // 开发者账号的AccessKey和SecretKey
    qiniu.conf.ACCESS_KEY = accessKey
    qiniu.conf.SECRET_KEY = secretKey

    // 上传的空间
    this.bucket = bucket
    // 文件过期时间
    this.deadline = parseInt(Date.now() / 1000) + 3600 // 一小时过期
  }
  // 生成上传的token
  generateToken (bucket) {
    // 配置项目
    const option = {
      scope: bucket
    }
    const putPolicy = new qiniu.rs.PutPolicy(option)
    // 生成token
    return putPolicy.uploadToken()
  }
  generateConfig () {
    const config = new qiniu.conf.Config()
    // 空间对应的机房 => 华东地区
    config.zone = qiniu.zone.Zone_z0
    // 是否使用cdn加速
    config.useCdnDomain = true

    return config
  }
  /**
   * 文件数据流上传
   * @param {Object} readableStream 可读取的文件流
   * @param {String} fileKey 上传到七牛云之后的文件名,默认原文件名
   */
  uploadFile (readableStream, fileKey) {
    return new Promise((resolve, reject) => {
      // 获取存储空间名
      const bucket = this.bucket
      // 获取基础配置
      const config = this.generateConfig()
      const token = this.generateToken(bucket)
      // 获取上传method
      const formUploader = new qiniu.form_up.FormUploader(config)
      const putExtra = new qiniu.form_up.PutExtra()

      formUploader.putStream(token, fileKey, readableStream, putExtra, function (respError, respBody, respInfo) {
        if (respError) {
          reject(respError)
        }
        resolve({ respBody, respInfo })
      })
    })
  }
  downloadFile (localFile) {
    const config = this.generateConfig()
    const publicBucketDomain = 'owxxrple2.bkt.clouddn.com'
    const mac = new qiniu.auth.digest.Mac(this.accessKey, this.secretKey)
    const bucketManager = new qiniu.rs.BucketManager(mac, config)

    return bucketManager.publicDownloadUrl(
      publicBucketDomain,
      localFile
      // this.deadline
    )
  }
}
