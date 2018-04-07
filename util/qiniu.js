const path = require('path')
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
  uploadFile (localFile) {
    return new Promise((resolve, reject) => {
      const _localFile = path.resolve(localFile)
      const bucket = this.bucket
      const key = _localFile

      // 获取基础配置
      const config = this.generateConfig()
      const token = this.generateToken(bucket)
      // 获取上传method
      const formUploader = new qiniu.form_up.FormUploader(config)
      const putExtra = new qiniu.form_up.PutExtra()
      /**
       * @param token {String}
       * @param _localFile {String} 上传的文件路径
       * @param key {String} 保存到七牛云之后的文件名
       * @param putExtra
       */
      formUploader.putFile(token, _localFile, key, putExtra, function (respError, respBody, respInfo) {
        if (respError) {
          reject(respError)
        }
        resolve({ respBody, respInfo })
      })
    })
  }
}
