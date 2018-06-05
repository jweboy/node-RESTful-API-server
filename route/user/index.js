const { signin, signup } = require('./controller')
const Mongodb = require('../../util/mongodb')

module.exports = function (fastify, option, next) {
  const db = new Mongodb(fastify.dbUser)
  fastify
    .post('/signin', {
      schema: {
        body: 'postSigninBody#'
      }
    }, signin(db))
    .post('/signup', {
      schema: {
        body: 'postSignupBody#'
      }
      // beforeHandler: fastify.auth([
      //   fastify.verifyUserAndPassword
      // ])
    }, signup(db))
}
