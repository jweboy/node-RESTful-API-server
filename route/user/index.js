const { signin, signup } = require('./controller')
const Mongodb = require('../../util/mongodb')

module.exports = function (fastify, option, next) {
  const db = new Mongodb(fastify.dbUser)
  fastify
    .post('/signin', {
      schema: {
        body: 'postSigninBody#'
      }
    }, signin(db, fastify.jwt))
    .post('/signup', {
      schema: {
        body: 'postSignupBody#'
      }
    }, signup(db, fastify.jwt))
}
