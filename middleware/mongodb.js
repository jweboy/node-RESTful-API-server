const plugin = require('fastify-plugin')
const mongoose = require('mongoose')
const util = require('util')
const { url, username, password } = require('../config/mongodb')

mongoose.Promise = global.Promise

function connectMongodb (fastify, option, next) {
  console.log(process.env.NODE_ENV)
  // const isDev = process.env.NODE_ENV === 'development'
  const mongoUrl = util.format(url, username, password)

  fastify.decorate('mongodb', mongoose)

  mongoose
    .connect(mongoUrl)
    .then((db) => {
      console.log('😁 数据库链接成功')
    // fastify.decorate('dbUser', db.model('users', {
    //   username: { type: String },
    //   password: { type: String },
    //   token: { type: String }
    // }))
    // fastify.decorate('dbGoods', db.model('goods', {}))

    // new
      fastify.decorate('uploadModel', db.model('upload', {
        name: { type: String },
        hash: {
          type: String,
          index: true
        // unique: true
        },
        bucket: { type: String }
      }, 'Upload'))

      next()
    })
    .catch(err => {
      throw err
    })
}

module.exports = plugin(connectMongodb)
