const qiniu = require('qiniu')
// const CreateErrors = require('http-errors')
const { accessKey, secretKey } = require('../config/qiniu')

module.exports = class Qiniu {
  constructor (
    bucket = 'our-future'
  ) {
    // 开发者账号的AccessKey和SecretKey
    qiniu.conf.ACCESS_KEY = accessKey
    qiniu.conf.SECRET_KEY = secretKey
    // 上传客户端
    this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    // 上传的镜像空间
    this.bucket = bucket
    // 文件过期时间
    this.deadline = parseInt(Date.now() / 1000) + 3600 // 一小时过期
    // 基础配置项
    this.config = Qiniu.generateConfig()
  }
  // 生成基础配置项
  static generateConfig () {
    const config = new qiniu.conf.Config()
    // 空间对应的机房 => 华东地区
    config.zone = qiniu.zone.Zone_z0
    // 是否使用cdn加速
    config.useCdnDomain = true

    return config
  }
  static getBucketManager () {
    const bucketManager = new qiniu.rs.BucketManager(this.mac, this.config)
    return bucketManager
  }
  // 生成上传的token
  generateToken (bucket) {
    // 配置项目
    const option = {
      scope: bucket || this.bucket,
      returnBody: `{
        "name":"$(key)",
        "id": "$(etag)"
      }`
    }
    const putPolicy = new qiniu.rs.PutPolicy(option)
    // 生成token
    return putPolicy.uploadToken()
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
      const token = this.generateToken(bucket)
      // 获取上传method
      const formUploader = new qiniu.form_up.FormUploader(this.config)
      const putExtra = new qiniu.form_up.PutExtra()

      formUploader.putStream(token, fileKey, readableStream, putExtra, function (respError, respBody, respInfo) {
        if (respError) {
          reject(respError)
        }
        resolve({ respBody, respInfo })
      })
    })
  }
  /**
   * 获取指定空间的文件列表
   *
   * @param {Object} [opts={
  *     limit: 100 // 指定列表数量
  *   }]
   * @returns {Promise}
   */
  getBucketList (opts = {
    limit: 100
  }) {
    return new Promise((resolve, reject) => {
      // 获取bucket method
      const bucketManager = new qiniu.rs.BucketManager(this.mac, this.config)
      // 获取指定bucket里的所有文件
      bucketManager.listPrefix(this.bucket, opts, function (respError, respBody, respInfo) {
        if (respError) {
          reject(respError)
        }
        resolve({ respBody, respInfo })
      })
    })
  }
  /**
   * 删除指定空间的文件
   *
   * @param {String} fileKey 文件名
   * @returns {Promise}
   */
  deleteFile (fileKey) {
    return new Promise((resolve, reject) => {
      // 获取bucket
      const bucketManager = Qiniu.getBucketManager()
      // 删除指定bucket的文件
      bucketManager.delete(this.bucket, fileKey, function (respError, respBody, respInfo) {
        // console.log(respError, respInfo, respBody)
        if (respError) {
          reject(respError)
        }
        resolve({
          statusCode: respInfo.statusCode,
          error: respBody ? respBody.error : null
        })
      })
    })
  }
  // getFileMsg (fileKey) {
  //   const bkt = this.generateBucketManager()
  //   console.log(bkt)
  // }
}
