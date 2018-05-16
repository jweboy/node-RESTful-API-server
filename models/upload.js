const { Schema } = require('mongoose')

const putFileSchema = new Schema({
  name: String,
  hash: String,
  bucket: String,
  createTime: {
    type: Date,
    default: new Date().getTime()
  }
})

module.exports = {
  putFileSchema
}
