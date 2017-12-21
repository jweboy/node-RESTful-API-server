const { insertOne, findOne } = require('../../models/users')
const { secret, expiresIn } = require('../../config/json-web-token')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

// 密码加密
const encryptPassword = (text) => {
  const hash = crypto.createHash('md5')
  hash.update(text) // 密码加密
  return hash.digest('hex')
}

// TODO 500 status 需要处理
// debug signin {}
// signin 通过密码比对 没有密码字段 500 需要捕获处理
// jwt 需要在get user info 做处理

// 注册
async function signup (ctx) {
  const body = ctx.request.body
  let result = null
  if (!body.username || !body.password) {
    ctx.res.error({}, '请输入您的账号密码')
  } else {
    body.password = encryptPassword(body.password)
    result = await insertOne(body)
    if (!result) {
      // ctx.status = 401
      return ctx.res.ok({}, '当前用户已存在')
    }
    ctx.res.ok({}, '成功创建新用户')
  }
}

// 登陆
async function signin (ctx) {
  const body = ctx.request.body
  let { username, password } = body
  password = encryptPassword(password)

  if (!username || !password) {
    ctx.status = 401
    ctx.res.fail({}, '参数不正确,请检查请求参数是否完整!')
  } else {
    const result = await findOne({
      username,
      password
    })
    console.log(2, result)
    if (!result) { // 该用户未注册
      return ctx.res.ok({}, '当时账号尚未注册')
    }
    const token = jwt.sign({
      name: username
    }, secret, {
      expiresIn
    })
    ctx.state.authToken = token
    // console.log(token)
    ctx.res.ok(result, '登陆成功')
  }
}

module.exports = {
  signup,
  signin
}
