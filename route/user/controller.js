const Mongodb = require('../../util/mongodb')

async function signup(fastify, body) {
  console.log(body);
  if (!body.username || !body.password) {
    const err = new Error()
    err.statusCode = 400
    err.message = '参数不正确,请检查请求参数是否完整!'
    throw err
  }
  // error just break next step
  const db = new Mongodb(fastify.dbUser)
  const { username, password } = body
  const person = await db.findOne({ username })
  if (person) { 
    const err = new Error()
    err.statusCode = 400
    err.message = '用户已存在!'
    throw err
  }
  const result = await db.insertOne(body)
  return result;
}

module.exports = {
  signup
}