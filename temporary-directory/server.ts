import * as fastify from 'fastify';
import * as CreateError from 'http-errors';
import * as signale from 'signale';
import ErrorException from 'interface/error';
import services from 'services';
import Fastify from 'interface/fastify';

// import * as path from 'path'

// const urlData = require('fastify-url-data')
// const autoload = require('fastify-autoload')
const accepts = require('fastify-accepts');
const formbody = require('fastify-formbody');
const multipart = require('fastify-multipart');
const schema = require('./plugin/schema');
// const fastify = require('fastify')({
// const { postAccessToken, postCreateBucket, getBucketList } = require('./route/qiniu')
//     // http2目前还没有完全支持 node >= 8.8.1
//     // issue https://github.com/fastify/fastify/issues/181
//     // http2: true
//     logger: require('./config/logger')
//   })
// const jwt = require('fastify-jwt')
// const auth = require('fastify-auth')

//   const mongodb = require('./middleware/mongodb')
//   const authCfg = require('./config/auth')

const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';
const protocol = process.env.PROTOCOL || 'http';
const server: Fastify['server'] = fastify({});

// process.env.NODE_ENV = 'development'

// hooks
server.addHook('preHandler', function preHandler(
  req: Fastify['request'],
  reply: Fastify['reply'],
  next: Fastify['next'],
) {
  // 设置cors,支持跨域
  reply.header('Access-Control-Allow-Origin', '*');
  reply.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

  next();
});

//   server.addHook('onClose', function (fastify, done) {
//     fastify.mongodb.disconnect()
//   })

//  notFoundHandler
server.setNotFoundHandler(function setNotFoundHandler(
  req: Fastify['request'],
  reply: Fastify['reply'],
) {
  reply.code(404).send({
    error: null,
    message: '资源不存在',
    statusCode: 404,
  });
});

// errorHandler
server.setErrorHandler(function setErrorHandler(
  err: ErrorException,
  req: Fastify['request'],
  reply: Fastify['reply'],
) {
  if (err.statusCode > 500) {
    throw err;
  } else {
    reply.send(new CreateError.InternalServerError(err.message));
  }
});

// decorate
// accepts register
// server.register(accepts)
// form body register => parse x-www-form-urlencoded bodies
// server.register(formbody)
// form-data register
// server.register(multipart)
// mongodb register
// fastify.register(mongodb)
// .after((err: Error) => {
//   if (err) { throw err }
//   signale.success('Mongodb registration successful.')
// })
// services register
server
  // .register(require('fastify-url-data'))
  .register(accepts)
  .register(formbody) // form body register => parse x-www-form-urlencoded bodies
  .register(multipart) // form-data register
  .register(schema)
  .register(services);
// .register(services, { prefix: 'api' })
// .register(autoload, {
//   dir: path.join(__dirname, 'services'),
//   options: { prefix: '/api' }
// })
// server
// .register(jwt, { secret: authCfg.jwtSecret })
// .register(auth)
// .after((err: Error) => {
//   if (err) { throw err }
//   signale.success('Routes registration successful.')
// })
// server.post('/api/qiniu/access-token', postAccessToken)
// server.post('/api/qiniu/bucket', { schema: { body: 'postBucket#' } }, postCreateBucket)
// server.get('/api/qiniu/bucket', getBucketList)
// server.delete('/api/qiniu/bucket/:name', { schema: { params: 'deleteBucket#' } }, deleteBucket)

// start server
server.listen(3000, (err: Error) => {
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
        label: 'Wow',
      },
    },
  });
  custom.wow(`Server is running at ${protocol}:${host}:${port}.`);
});

export default server;
