const plugin = require('fastify-plugin')
const mongoose = require('mongoose')
const util = require('util')
const mongoConfig = require('../config/mongodb.json')

const mongoUrl = util.format(
  mongoConfig.url,
  mongoConfig.username,
  mongoConfig.password
)

function connectMongodb (fastify, option, next) {
  mongoose.connect(mongoUrl)
    .then(client => {
      // console.log(client)
      // const db = client.db('goods').find()
      // fastify.register(require('fastify-mongodb'), { client: client })
      // .register(function (fastify, opts, next) {
      console.log(client)
      //   })
      //   next()
      // })
      next()
    })
    .catch(err => { 
      console.log('db connect error:', err);
    })
}

module.exports = plugin(connectMongodb)
