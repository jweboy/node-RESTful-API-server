import Qiniu from 'util/qiniu'
import Fastify from 'interface/fastify'

const qiniu = Qiniu.create()

async function postCreateBucket(
    req: Fastify['request'],
    reply: Fastify['reply'],
) {
    const body = req.body
    try {
        const data = await qiniu.postBucket(body.name)
        reply.code(204).send(data)
    } catch (err) {
        reply.send(err)
    }
}

async function getBucketList(
    req: Fastify['request'],
    reply: Fastify['reply'],
) {
    try {
        const list = await qiniu.getBucket()
        reply.send(list)
    } catch (err) {
        reply.send(err)
    }
}

async function deleteBucket(
    req: Fastify['request'],
    reply: Fastify['reply'],
) {
    const params = req.params
    try {
        const result = await qiniu.deleteBucket(params.name)
        reply.send(result)
    } catch (err) {
        reply.send(err)
    }
}

export {
    postCreateBucket,
    getBucketList,
    deleteBucket,
}
