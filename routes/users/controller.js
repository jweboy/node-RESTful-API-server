const { insertOne, findOne } = require('../../models/users')
// const { secret, expiresIn } = require('../../config/json-web-token')
// const jwt = require('jsonwebtoken')
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
// 密码比对 是否已经存在

/**
 * 用户注册
 * info => 几点考虑
 * 1.目前通过用户名的唯一性查询数据库,后期如果需要绑定手机号码、邮箱之类的操作,需要调整唯一性的逻辑点
 */
async function signup (ctx) {
  const body = ctx.request.body
  let result = null
  let { username, password, ...other } = body
  if (!username || !password) {
    ctx.res.unauthorized({}, '参数不正确,请检查请求参数是否完整!')
  } else {
    result = await insertOne({
      username,
      password,
      ...other
    })
    if (result.err) { // 数据库已存在当前用户
      return ctx.res.unauthorized({}, result.data)
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
    ctx.res.ok({}, '参数不正确,请检查请求参数是否完整!')
  } else {
    const err = await findOne(username)
    // console.log(1, err)
    // 未注册 => return json
    if (!err) {
      return ctx.res.unauthorized({}, '此账号未注册')
    }
    // 已注册 => login

    // const token = jwt.sign({
    //   name: username
    // }, secret, {
    //   expiresIn
    // })
    // ctx.state.authToken = token
    // // console.log(token)
    // ctx.res.ok({
    //   accessToken: token,
    //   expiresIn
    // }, '登陆成功')
  }
}

module.exports = {
  signup,
  signin
}
