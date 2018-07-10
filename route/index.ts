import * as fastify from "fastify";

// // const goods = require('./goods')
// // const user = require('./user')
// // const upload = require('./upload')
// // const qiniu = require('./qiniu')

// module.exports = function (fastify) {
//   // index route
//   fastify.get('/', function (request, reply) {
//     reply
//       .send({
//         statusCode: 200,
//         message: 'fastify RESTful API',
//         error: null
//       })
//   })
//   // goods(fastify, ...args)
//   // upload(fastify, ...args)
//   // user(fastify, ...args)
// //   qiniu(fastify, ...args)
// }

export default function (instance: fastify.FastifyInstance, options: Object, next:Function) {
    // the route will be '/english/hello'
    instance.get('/hello', {}, (req, reply) => {
      reply.send({ greet: 'hello' })
    })
    next()
  }