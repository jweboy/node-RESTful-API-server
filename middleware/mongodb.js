const plugin = require('fastify-plugin')
const mongoose = require('mongoose')
const signale = require('signale')
const util = require('util')
const { devUrl, proUrl, username, password } = require('../config/mongodb')
const { putFileSchema } = require('../models/upload')
const { signupSchema } = require('../models/user')

const isDev = process.env.NODE_ENV !== 'production'

mongoose.Promise = global.Promise

function connectMongodb (fastify, option, next) {
  const mongoUrl = util.format(proUrl, username, password)

  fastify.decorate('mongodb', mongoose)

  mongoose
    .connect(isDev ? devUrl : mongoUrl)
    .then((db) => {
      signale.complete(`Mongodb connection succeeded. Connect address is ${isDev ? devUrl : mongoUrl}`)

    // new
      fastify.decorate('dbUpload', db.model('upload', putFileSchema, 'Upload'))
      fastify.decorate('dbUser', db.model('user', signupSchema, 'User'))

      next()
    })
    .catch(err => {
      signale.error('Mongodb connection failed.')
      throw err
    })
}

module.exports = plugin(connectMongodb)
