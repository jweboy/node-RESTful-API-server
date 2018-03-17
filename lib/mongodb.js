/**
 * @class Mongodb
 */
class Mongodb {
  constructor (colName, mongo) {
    this.colName = colName
    this.mongo = mongo
  }
  find () {
    return new Promise((resolve, reject) => {
      this.mongo.db.collection(this.colName, function (err, collection) {
        if (err) {
          reject(new Error(err))
        }
        return collection
          .find()
          .toArray(function (err, data) {
            if (err) {
              reject(new Error(err))
            }
            resolve(data)
          })
      })
    })
  }
  count () {
    // 数据量超大时候 count性能有问题 这是一个可持续优化的点
    // 参考 https://cnodejs.org/topic/559a0bf493cb46f578f0a601
    return new Promise((resolve, reject) => this.collection
      .count()
      .then(count => resolve(count))
      .catch(err => reject(err))
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
    return new Promise((resolve, reject) => this.collection
      .find()
      .skip(size * (page - 1)) // skip在数据量大的时候会有性能问题
      .limit(size)
      .toArray(function (err, data) {
        if (err) reject(new Error(err))

        resolve(data)
      }))
  }
}

module.exports = Mongodb
