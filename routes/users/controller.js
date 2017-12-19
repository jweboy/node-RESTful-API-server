const { insertOne } = require('../../models/users')

// TODO token 生成 => 注入到每个用户
// TODO 权限验证

// 注册
async function signin (ctx) {
  const user = ctx.request.body
  if (!user.username || !user.password) {
    ctx.res.error({}, '请输入您的账号密码')
  } else {
    const result = await insertOne(user)
    if (!result) {
      return ctx.res.success({}, '当前用户已存在')
    }
    ctx.res.success({}, '成功创建新用户')
  }
}

module.exports = {
  signin
}
