// https://developer.qiniu.com/fusion/kb/1425/the-http-status-code-books

module.exports = {
  // http官方状态码
  409: '请求存在冲突无法处理该请求,一般指服务器已经存在要上传的资源',
  // 七牛云扩展状态码
  612: '指定资源不存在或已被删除',
  614: '目标资源已存在',
  631: '指定空间不存在'
}
