const { insertOne } = require('../../models/users')
const crypto = require('crypto')

const hash = crypto.createHash('md5')

// TODO status 状态码需要自定义

// 注册
async function signup (ctx) {
  const user = ctx.request.body
  if (!user.username || !user.password) {
    ctx.res.error({}, '请输入您的账号密码')
  } else {
    let result = null
    hash.update(user.password) // 密码加密
    user.password = hash.digest('hex')
    result = await insertOne(user)
    if (!result) {
      // ctx.status = 401
      return ctx.res.success({}, '当前用户已存在')
    }
    ctx.res.success({}, '成功创建新用户')
  }
}

module.exports = {
  signup
}
