const { getBucketList, postCreateBucket, deleteBucket } = require('./qiniu')

// module.exports = function (fastify, opts, next) {
  // server.post('/api/qiniu/access-token', postAccessToken)
// }

module.exports =  function services(fastify, opts, next) {
  fastify.get('/', (request, reply) => {
    reply.send('fastify RESTful API')
  })
  
  // qiniu
  fastify
    .get('/qiniu/bucket', getBucketList)
    .post('/qiniu/bucket', { schema: { body: 'postBucket#' } }, postCreateBucket)
    .delete('/qiniu/bucket/:name', { schema: { params: 'deleteBucket#' } }, deleteBucket)

  next()
}