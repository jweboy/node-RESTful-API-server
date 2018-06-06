const CreateErrors = require('http-errors')
const bcrypt = require('bcrypt')

const PWDLEN = 6

const signup = (db, jwt) => (req, reply) => {
  const body = req.body
  const { username, password } = body
  bcrypt.hash(password, PWDLEN)
    .then(async (hash) => {
      try {
        const user = await db.findOne({ username })
        /* eslint-disable */
        if (!!user) { 
          // 数据库已经存在该用户
          reply.send(new CreateErrors(409, '当前用户已注册'))
        } else {
          const { password, ...otherProps } = await db.insertOne({
            username,
            password: hash,
            token: jwt.sign(body),
          })
          reply.code(201).send({
            code: 201,
            message: '成功创建新用户',
            data: otherProps
          })
        }
      } catch (err) {
        reply.send(new CreateErrors.InternalServerError(err))
      }
    })
    .catch(err => {
      // hash password failed
      reply.send(new CreateErrors(err))
    })
}

const signin = (db) => async (req, reply) => {
  console.log(req.body)
  const body = req.body
  try {
    const result = await db.findOne(body)
    console.log(result)
    if (result == null) {
      return reply.send(new CreateErrors.InternalServerError('登陆失败,当前用户未注册'))
    }
    reply.send('signin')
  } catch (err) {

  }
}

module.exports = {
  signup,
  signin
}
