const { signin, signup } = require('./controller')
const Mongodb = require('../../util/mongodb')

module.exports = function (fastify, option, next) {
  const db = new Mongodb(fastify.dbUser)
  fastify
    .post('/user/signin', {
      schema: {
        body: 'postSigninBody#',
        response: { 200: 'postSigninSuccess#' }
      }
    }, signin(db))
    .post('/user/signup', {
      schema: {
        body: 'postSignupBody#',
        response: { 201: 'postSignupSuccess#' }
      }
    }, signup(db))
}
