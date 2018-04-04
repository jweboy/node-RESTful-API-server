const qiniu = require('qiniu')
const { accessKey, secretKey } = require('../config/qiniu')

module.exports = class Qiniu {
  constructor() { 
    this.accessKey = accessKey
    this.secretKey = secretKey
  }
  generateToken(opts = {
    scope:'our-future'
  }) { 
    this.authObj = new qiniu.auth.digest.Mac(
      this.accessKey,
      this.secretKey
    )
    const putPolicy = new qiniu.rs.PutPolicy(opts)
    return putPolicy.uploadToken(this.authObj)
  }
}