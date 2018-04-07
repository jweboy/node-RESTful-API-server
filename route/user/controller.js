const Mongodb = require('../../util/mongodb')

/**
 * 注册
 * @param {*} fastify
 * @param {*} request
 * @param {*} reply
 */
async function signup (fastify, request, reply) {
  const body = request.body
  // if (!body.username || !body.password) {
  //   const err = new Error()
  //   err.statusCode = 400
  //   err.message = '参数不正确,请检查请求参数是否完整!'
  //   throw err
  // }
  // error just break next step
  const db = new Mongodb(fastify.dbUser)
  const { username, password } = body
  try {
    const person = await db.findOne({ username })
    if (person) {
      const err = new Error()
      err.statusCode = 400
      err.message = '用户已存在!'
      throw err
    }
    // put user into level
    fastify.level.put(username, password, onPut)

    function onPut (err) {
      if (err) {
        throw err
      }
      // create token
      fastify.jwt.sign(body, onToken)
    }

    async function onToken (err, token) {
      if (err) {
        throw err
      }
      // insert user into db
      const result = await db.insertOne({
        ...body,
        token
      })
      return result
    }
  } catch (err) {
    throw err
  }
}

async function signin (fastify, request, reply) {

}

module.exports = {
  signup,
  signin
}
