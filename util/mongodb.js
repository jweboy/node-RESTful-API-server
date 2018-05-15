const CreateErrors = require('http-errors')
const statusCode = require('../config/statusCode')

/**
 * @class Mongodb
 */
class Mongodb {
  constructor (db) {
    this.db = db
  }
  find (obj, limit = null) {
    return new Promise((resolve, reject) => {
      this.db
        .find(obj)
        .limit(limit)
        .then(data => resolve(data))
        .catch(err => reject(new Error(err)))
    })
  }
  count () {
    // 数据量超大时候 count性能有问题 这是一个可持续优化的点
    // 参考 https://cnodejs.org/topic/559a0bf493cb46f578f0a601
    return new Promise((resolve, reject) => this.db.count()
      .then(count => resolve(count))
      .catch(err => reject(new Error(err)))
    )
  }
  /**
   *
   * @param {page} Number
   * @param {size} Number
   */
  page ({
    page = 1,
    size = 10
  }) {
    return new Promise((resolve, reject) => this.db.find()
      .skip(size * (page - 1)) // skip在数据量大的时候会有性能问题
      .limit(size)
      .exec(function (err, data) {
        if (err) reject(new Error(err))

        resolve(data)
      }))
  }
  findOne (body) {
    return new Promise((resolve, reject) => this.db.findOne(body, function (err, data) {
      if (err) reject(new Error(err))
      resolve(data)
    }))
  }
  async insertOne (insertObj, body) {
    return new Promise(async (resolve, reject) => {
      try {
        const findResult = await this.findOne(insertObj)
        // 数据库已经存在
        if (!!findResult) { // eslint-disable-line 
          reject(new CreateErrors(409, statusCode['409']))
        } else {
          const insertResult = await this.db.create(insertObj)
          resolve(insertResult._doc)
        }
      } catch (err) {
        reject(new CreateErrors(500, err))
      }
    })
  }
}

module.exports = Mongodb
