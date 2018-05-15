const plugin = require('fastify-plugin')
const mongoose = require('mongoose')
// const util = require('util')
const {
  url
  // username, password
} = require('../config/mongodb')

mongoose.Promise = global.Promise

function connectMongodb (fastify, option, next) {
  console.log(process.env.NODE_ENV)
  // const isDev = process.env.NODE_ENV === 'development'
  // const mongoUrl = util.format(url, username, password)

  fastify.decorate('mongodb', mongoose)

  mongoose
    .connect(url)
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
          default: Date.now
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
