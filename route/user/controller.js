const CreateErrors = require('http-errors')
const bcrypt = require('bcrypt')

const PWDLEN = 6

const signup = (db) => (req, reply) => {
  const body = req.body
  const { username, password } = body

  // 加密密码
  bcrypt.hash(password, PWDLEN)
    .then(async (hash) => {
      try {
        // 查找用户是否注册
        const user = await db.findOne({ username })
        /* eslint-disable */
        if (!!user) { 
          // 数据库已经存在该用户 -> statusCode:409
          reply.send(new CreateErrors.Conflict('当前用户已注册'))
        } else {
          // 生成token
          reply.jwtSign(body, async function (err, token) {
            if (err) {
              return reply.send(new CreateErrors.InternalServerError(err))
            }
            // 数据库插入
            const user = await db.insertOne({ username, password: hash, token })
            reply.code(201).send({
              statusCode: 201,
              message: '成功创建新用户',
              data: { ...user, id: user._id },
            })
          })
        }
      } catch (err) {
        reply.send(new CreateErrors.InternalServerError(err))
      }
    })
    .catch(err => {
      // hash password failed
      reply.send(new CreateErrors.InternalServerError(err))
    })
}

const signin = (db) => (req, reply) => {
  const body = req.body
  const { username, password } = body

  db
    .findOne({ username })
    .then((user) => { 
      // 数据库不存在当前用户
      if (user == null) { 
        return reply.send(new CreateErrors.InternalServerError('当前用户未注册,请注册后再登录'))
      }
      // 验证token是否有效
      req.jwtVerify(async function (err, decoded) {
        if (err) {
          return reply.send(new CreateErrors.InternalServerError(err))
        }
        
        // 校验密码是否一致
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) { 
          reply.send({ statusCode: 200, message: '登陆成功', data: user })
        } else {
          reply.send(new CreateErrors.BadRequest('登录失败,密码错误'))
        }
      })
    })
    .catch((err) => {
      reply.send(new CreateErrors.InternalServerError(err))
    })
}

module.exports = { signup, signin }
