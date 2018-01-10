const jwt = require('jsonwebtoken')
const { insertOne, findOne, comparePassword } = require('../../models/users')
const { secret, expiresIn } = require('../../config/json-web-token')

// TODO 增加一个get user info 接口
// TODO 如何保证其他接口可以都拿到token => 考虑ctx.state
// info => 接口需要接上去做调试
// comparePassword函数逻辑有问题

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

/**
 * 用户登陆
 */
async function signin (ctx) {
  const body = ctx.request.body
  let { username, password } = body

  if (!username || !password) {
    ctx.res.paramIncorrect({}, '参数不正确,请检查请求参数是否完整!')
  } else {
    const user = await findOne(username)
    // 未注册 => return json
    if (!user) {
      return ctx.res.paramIncorrect({}, '此账号未注册')
    }
    // 已注册 => login => 匹配密码
    const isPwdMatch = await comparePassword(user.password, password)
    if (!isPwdMatch) {
      return ctx.res.paramIncorrect({}, '密码错误,登陆失败!')
    }
    // success
    const token = jwt.sign({
      name: username
    }, secret, {
      expiresIn
    })
    // ctx.req.authToken = token
    ctx.res.ok({
      accessToken: token,
      expiresIn
    }, '登陆成功')
  }
}

/**
 * 用户个人资料
 */
// async function  (params) {
// }

module.exports = {
  signup,
  signin
}
