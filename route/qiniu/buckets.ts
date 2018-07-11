import * as fastify from "fastify";
import { ServerResponse, IncomingMessage } from "http";
import Qiniu from '../../util/qiniu'

const qiniu = Qiniu.create()

async function postCreateBucket(req: fastify.FastifyRequest<IncomingMessage>, reply: fastify.FastifyReply<ServerResponse>) {
    const body = req.body
    try{
        const data = await qiniu.postBucket(body.name)
        console.log('data', data)
        reply.send('create')
        // reply.send(data)
    } catch(err) {
        reply.send(err)
    }
}

async function getBucketList(req: fastify.FastifyRequest<IncomingMessage>, reply: fastify.FastifyReply<ServerResponse>) {
    try {
        const list = await qiniu.getBucket()
        reply.send(list)
    } catch(err) {
        reply.send(err)
    }
}

async function deleteBucket(req: fastify.FastifyRequest<IncomingMessage>, reply: fastify.FastifyReply<ServerResponse>) {
    console.log(req.params);
    const params = req.params
    try {
        const result = await qiniu.deleteBucket(params.name)
        reply.send(result)
    } catch(err) {
        reply.send(err)
    }
}

export {
    postCreateBucket,
    getBucketList,
    deleteBucket
}