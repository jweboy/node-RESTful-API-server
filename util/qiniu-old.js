// const qiniu = require('qiniu')
// // const CreateErrors = require('http-errors')
// const { accessKey, secretKey } = require('../config/qiniu')
// const statusCode = require('../config/statusCode')

// // TODO: Promise部分可以提取出一个共用函数

// const tempMap = Symbol('tempMap')

// module.exports = class Qiniu {
//   constructor (
//     bucket = 'our-future'
//   ) {
//     // 开发者账号的AccessKey和SecretKey
//     qiniu.conf.ACCESS_KEY = accessKey
//     qiniu.conf.SECRET_KEY = secretKey
//     // 上传客户端
//     this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
//     // 上传的镜像空间
//     this.bucket = bucket
//     // 文件过期时间
//     this.deadline = parseInt(Date.now() / 1000) + 3600 // 一小时过期
//     // 基础配置项
//     this.config = Qiniu.generateConfig()
//     // 存储临时变量
//     this[tempMap] = new Map()
//   }
//   // 生成基础配置项
//   static generateConfig () {
//     const config = new qiniu.conf.Config()
//     // 空间对应的机房 => 华东地区
//     config.zone = qiniu.zone.Zone_z0
//     // 是否使用cdn加速
//     config.useCdnDomain = true

//     return config
//   }
//   static getBucketManager () {
//     const bucketManager = new qiniu.rs.BucketManager(this.mac, this.config)
//     return bucketManager
//   }
//   /**
//    * 文件数据流上传
//    * @param {Object} readableStream 可读取的文件流
//    * @param {String} fileKey 上传到七牛云之后的文件名,默认原文件名
//    */
//   uploadFile (readableStream, fileKey, opts) {
//     return new Promise((resolve, reject) => {
//       // 获取存储空间名
//       const getBucketName = opts.bucket

//       // 生成空间对应token
//       const getBucketToken = Qiniu.generateToken(getBucketName)

//       // 获取上传method
//       const formUploader = new qiniu.form_up.FormUploader(this.config)
//       const putExtra = new qiniu.form_up.PutExtra()

//       formUploader.putStream(getBucketToken, fileKey, readableStream, putExtra, function (respError, respBody, respInfo) {
//         const { statusCode: status, data } = respInfo
//         if (respError) {
//           reject(respError)
//         }
//         if (status !== 200) {
//           const error = new Error()
//           error.error = data.error
//           error.statusCode = status
//           error.message = statusCode[status]
//           reject(error)
//         }
//         resolve({
//           statusCode: respInfo.statusCode,
//           data: respBody
//         })
//       })
//     })
//   }
//   /**
//    * 获取指定空间的文件列表
//    *
//    * @param {Object} [opts={
//   *     limit: 100 // 返回的最大列举文件数量
//   *   }]
//    * @returns {Promise}
//    */
//   getFiles ({ page, size, prefix }) {
//     return new Promise((resolve, reject) => {
//       const opts = {
//         limit: size,
//         prefix: prefix || '',
//         marker: this[tempMap].get('marker')
//       }
//       if (!this[tempMap].has('page')) {
//         this[tempMap].set('page', {
//           prev: 1,
//           next: page
//         })
//       } else {
//         const currPos = this[tempMap].get('page')
//         currPos.prev = currPos.next
//         currPos.next = page
//         this[tempMap].set('page', currPos)
//       }
//       // 获取bucket
//       const bucketManager = Qiniu.getBucketManager()
//       // 获取指定bucket里的所有文件
//       bucketManager.listPrefix(this.bucket, opts, (respError, respBody, respInfo) => {
//         if (respError) {
//           reject(respError)
//         }
//         const nextMarker = respBody.marker
//         const pagePos = this[tempMap].get('page')
//         console.log('pagePos', nextMarker, pagePos.prev !== pagePos.next)
//         if (nextMarker && (pagePos.prev !== pagePos.next)) {
//           this[tempMap].set('marker', nextMarker)
//           console.log(this[tempMap])
//         }
//         // else {
//         //   const currMarker = this[tempMap].get('marker')
//         //   this[tempMap].set('marker', currMarker)
//         // }
//         resolve({
//           statusCode: respInfo.statusCode,
//           error: (respBody && respBody.error) ? respBody.error : null,
//           respBody
//         })
//       })
//     })
//   }
//   /**
//    * 删除指定空间的文件
//    *
//    * @param {String} fileKey 文件名
//    * @returns {Promise}
//    */
//   deleteFile (key) {
//     return new Promise((resolve, reject) => {
//       // 获取bucket
//       const bucketManager = Qiniu.getBucketManager()
//       // 删除指定bucket的文件
//       bucketManager.delete(this.bucket, key, function (respError, respBody, respInfo) {
//         const { statusCode: status, data } = respInfo
//         if (respError) {
//           reject(respError)
//         }
//         if (status !== 200) {
//           const error = new Error()
//           error.error = data.error
//           error.statusCode = status
//           error.message = statusCode[status]
//           reject(error)
//         }
//         resolve({
//           statusCode: respInfo.statusCode,
//           data: respBody
//         })
//       })
//     })
//   }
//   postBuckets() {
//     const bucketManager = Qiniu.getBucketManager()

//     bucketManager.image('other', 'http://www.baidu.com/', null, function(err, respBody, respInfo) {
//       console.log(err, respBody, respInfo);
//     })
//   }
//   test() {
//     var putPolicy = new qiniu.rs.PutPolicy({
//       scope: 'test'
//     });

//     var uploadToken = putPolicy.uploadToken(this.mac);
//     console.log(uploadToken)
//     return uploadToken
//   }
//   private
// }
