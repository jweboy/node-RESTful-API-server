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
  fastify.decorate('mongodb', mongoose)
  mongoose.connect(mongoUrl).then((db) => {
    fastify.decorate('dbUser', db.model('user', {}))
    fastify.decorate('dbGoods', db.model('goods', {}))
    next()
  })
}

module.exports = plugin(connectMongodb)
