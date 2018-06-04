const { signin } = require('./controller')
const Mongodb = require('../../util/mongodb')

// const schema = {
//   body: {
//     type: 'object',
//     properties: {
//       username: { type: 'string' },
//       password: { type: 'string' }
//     },
//     required: ['username', 'password']
//   },
//   response: {
//     201: {
//       type: 'object',
//       properties: {
//         code: { type: 'number' },
//         message: { type: 'string' }
//         // data: {
//         //   username: { type: 'string' },
//         //   password: { type: 'string' },
//         //   token: { type: 'string' },
//         // }
//       }
//     }
//   }
// }

module.exports = function (fastify, option, next) {
  const db = new Mongodb(fastify.dbUser)
  fastify
    .post('/signin', {
      schema: {
        body: 'postSigninBody#'
      }
    }, signin(db))
//   fastify
//     .post('/signin', {
//       signinSchema,
//       beforeHandler: fastify.auth([
//         fastify.verifyUserAndPassword
//       ])
//     }, async function (request, reply) {
//       reply.send('ok')
//     })
//     .get('/signin', function (request, reply) {
//       reply.header('Content-Type', 'application/json')
//       reply.send('用户登陆接口只有POST方法')
//       next()
//     })
}
