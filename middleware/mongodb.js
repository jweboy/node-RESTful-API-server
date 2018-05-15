const plugin = require('fastify-plugin')
const mongoose = require('mongoose')
const util = require('util')
const { devUrl, proUrl, username, password } = require('../config/mongodb')

mongoose.Promise = global.Promise
const isDev = process.env.NODE_ENV === 'development'

function connectMongodb (fastify, option, next) {
  const mongoUrl = util.format(proUrl, username, password)

  fastify.decorate('mongodb', mongoose)

  mongoose
    .connect(isDev ? devUrl : mongoUrl)
    .then((db) => {
      console.log('😁 数据库连接成功')
    // fastify.decorate('dbUser', db.model('users', {
    //   username: { type: String },
    //   password: { type: String },
    //   token: { type: String }
    // }))
    // fastify.decorate('dbGoods', db.model('goods', {}))

    // new
      fastify.decorate('dbUpload', db.model('upload', {
        name: String,
        hash: String,
        bucket: String,
        createTime: {
          type: Date,
          default: new Date().getTime()
        }
      }, 'Upload'))

      next()
    })
    .catch(err => {
      console.log('😿 数据库连接失败')
      throw err
    })
}

module.exports = plugin(connectMongodb)
