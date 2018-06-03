const { signup } = require('./controller')

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

// const signinSchema = {
//   body: {
//     type: 'object',
//     properties: {
//       username: { type: 'string' },
//       password: { type: 'string' }
//     },
//     required: ['username', 'password']
//   }
// }

module.exports = function (fastify, option, next) {
  fastify
    .post('/signup', signup())
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

// const { signin } = require('./controller')
// const Mongodb = require('../../util/mongodb')

// module.exports = function (fastify, opts, next) {
//   // const db = new Mongodb(fastify.dbUser)
//   fastify
//     .post('/signin', {
//       // schema:
//     }, signin(db))
// }
