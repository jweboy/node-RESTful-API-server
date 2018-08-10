import Fastify from 'interface/fastify'
import { getBucketList, postCreateBucket, deleteBucket } from './qiniu'

// module.exports = function (fastify, opts, next) {
  // server.post('/api/qiniu/access-token', postAccessToken)
// }

function services(
    fastify: Fastify['instance'],
    opts: Fastify['options'],
    next: Fastify['next'],
) {
  fastify.get('/', (req, reply) => {
    reply.send('fastify RESTful API')
  })

  // qiniu
  fastify
    .get('/qiniu/bucket', getBucketList)
    .post('/qiniu/bucket', { schema: { body: 'postBucket#' } }, postCreateBucket)
    .delete('/qiniu/bucket/:name', { schema: { params: 'deleteBucket#' } }, deleteBucket)

  next()
}

export default services
