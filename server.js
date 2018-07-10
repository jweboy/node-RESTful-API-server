"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify = require("fastify");
// const fastify = require('fastify')({
//     // http2目前还没有完全支持 node >= 8.8.1
//     // issue https://github.com/fastify/fastify/issues/181
//     // http2: true
//     logger: require('./config/logger')
//   })
//   const jwt = require('fastify-jwt')
//   const formbody = require('fastify-formbody')
//   const multipart = require('fastify-multipart')
//   // const auth = require('fastify-auth')
//   const accepts = require('fastify-accepts')
//   const CreateError = require('http-errors')
const signale = require('signale');
//   const routes = require('./route')
// //   const mongodb = require('./middleware/mongodb')
//   const authCfg = require('./config/auth')
//   const schema = require('./plugin/schema')
const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';
const protocol = process.env.PROTOCOL || 'http';
const server = fastify();
//   // process.env.NODE_ENV = 'development'
//   // TODO: next没有定义类型
//   // hooks
//   server.addHook('preHandler', function (req: fastify.FastifyRequest<IncomingMessage>, reply: fastify.FastifyReply<ServerResponse>, next) {
//     // fastify.util(req, 'timestamp', new Date())
//     // 设置cors,支持跨域
//     reply.header('Access-Control-Allow-Origin', '*')
//     reply.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//     next()
//   })
// //   server.addHook('onClose', function (fastify, done) {
// //     fastify.mongodb.disconnect()
// //   })
//   // notFoundHandler
//   server.setNotFoundHandler(function (req, reply) {
//     reply.code(404).send({
//       statusCode: 404,
//       message: '资源不存在',
//       error: null
//     })
//   })
//   // errorHandler
//   server.setErrorHandler(function (err: Error, req: fastify.FastifyRequest<IncomingMessage>, reply: fastify.FastifyReply<ServerResponse>) {
//     reply.send(new CreateError(500, err))
//   })
//   // decorate
//   // accepts register
//   server.register(accepts)
//   // form body register => parse x-www-form-urlencoded bodies
//   server.register(formbody)
//   // form-data register
//   server.register(multipart)
//   // mongodb register
//   // fastify.register(mongodb)
//     .after((err: Error) => {
//       if (err) { throw err }
//       signale.success('Mongodb registration successful.')
//     })
//   // routes register
//   server
//     .register(jwt, { secret: authCfg.jwtSecret })
//     // .register(auth)
//     .register(schema)
//     .register(routes, { prefix: 'api' })
//     .after((err: Error) => {
//       if (err) { throw err }
//       signale.success('Routes registration successful.')
//     })
// start server
server.listen(3000, (err) => {
    if (!!err) {
        signale.error(`Error starting server:${err}.`);
        process.exit(1);
    }
    const Signale = signale.Signale;
    const custom = new Signale({
        types: {
            wow: {
                badge: '🎅 ',
                color: 'blue',
                label: 'Wow'
            }
        }
    });
    custom.wow(`Server is running at ${protocol}:${host}:${port}.`);
});
module.exports = server;
