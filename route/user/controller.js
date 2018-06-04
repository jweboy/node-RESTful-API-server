const CreateErrors = require('http-errors')

// /**
//  * 注册
//  * @param {*} fastify
//  * @param {*} request
//  * @param {*} reply
//  */
// const signup = () => (req, reply) => {
//   const body = req.body
//   console.log(body)
//   reply.send('signup is ok')
// }
//       const result = await signup(fastify, request, reply)
//       reply.send({
//         code: 201,
//         message: '成功创建新用户',
//         data: result
//       })
//       next()
//     })
//     .get('/signup', function (request, reply) {
//       reply.header('Content-Type', 'application/json')
//       reply.send('用户注册接口只有POST方法')
//       next()
//   // if (!body.username || !body.password) {
//   //   const err = new Error()
//   //   err.statusCode = 400
//   //   err.message = '参数不正确,请检查请求参数是否完整!'
//   //   throw err
//   // }
//   // error just break next step
//   const db = new Mongodb(fastify.dbUser)
//   const { username, password } = body
//   try {
//     const person = await db.findOne({ username })
//     if (person) {
//       const err = new Error()
//       err.statusCode = 400
//       err.message = '用户已存在!'
//       throw err
//     }
//     // put user into level
//     fastify.level.put(username, password, onPut)

//     function onPut (err) {
//       if (err) {
//         throw err
//       }
//       // create token
//       fastify.jwt.sign(body, onToken)
//     async function onToken (err, token) {
//       if (err) {
//         throw err
//       }
//       // insert user into db
//       const result = await db.insertOne({
//         ...body,
//         token
//       })
//       return result
//     }
//   } catch (err) {
//     throw err
//   }
// }
const signin = (db) => async (req, reply) => {
  console.log(req.body)
  const body = req.body
  try {
    const result = await db.findOne(body)
    console.log(result)
    if (result === null) {
      return reply.send(new CreateErrors.NotFound())
    }
    reply.send('signin')
  } catch (err) {

  }
}

module.exports = {
  // signup
  signin
}
