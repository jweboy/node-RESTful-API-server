const urlUtil = require('url') // url模块
const request = require('request') // request模块

const _getMethod = ({ method }) => method.toLowerCase()

const _cb = (option) => {
  const method = _getMethod(option)
  return new Promise((resolve, reject) => {
    return request[method](option, (err, res, body) => {
      console.log(`${method}返回错误:${err}`)
      console.log(`${method}返回body:`, body)
      if (body.errcode === 0) { // success => post
        return resolve({
          errcode: 0,
          errmsg: body.errmsg,
        })
      } else if (body.errcode > 0) { // fail => post
        return reject({
          errcode: body.errcode,
          errmsg: `${method}请求出错 => ${body.errmsg}`
        })
      } else { // get
        return resolve({
          errcode: 0,
          errmsg: 'ok',
          data: body,
        })
      }
    })
  })
}

exports._request = (method, url, data) => {
  const option = {
    method: 'GET',
    json: true,
    url: urlUtil.parse(url),
  }
  if (method === 'POST') {
    Object.assign(option, {
      method,
      body: data,
    })
  }
  return _cb(option)
}
