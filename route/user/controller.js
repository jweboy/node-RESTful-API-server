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
          reply.jwtSign(body, async function (err, token) {
            if (err) {
              return reply.send(new CreateErrors.InternalServerError(err))
            }
            const { password, ...otherProps } = await db.insertOne({
              username,
              password: hash,
              token
            })
            reply.code(201).send({
              code: 201,
              message: '成功创建新用户',
              data: otherProps
            })
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

const signin = (db, jwt) => (req, reply) => {
  const body = req.body
  const { username, password } = body

  db
    .findOne({ username })
    .then((user) => { 
      req.jwtVerify(async function (err, decoded) {
        // console.log(err, decoded);
        if (err) {
          return reply.send(new CreateErrors.InternalServerError(err))
        }
        
        // compare pwd
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) { 
          reply.send({
            code: 200,
            message: '登陆成功',
            data: {
              id: user._id,
              username: user.username,
              token: user.token,
              createTime: user.createTime,
            }
          })
        } else {
          reply.send(new CreateErrors.BadRequest('该用户密码错误'))
        }
      })
    })
    .catch(() => { 
        reply.send(new CreateErrors.InternalServerError('登陆失败,当前用户未注册'))
    })
}

module.exports = {
  signup,
  signin
}
