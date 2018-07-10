import * as fastify from "fastify";
import { ServerResponse, IncomingMessage } from "http";
import Qiniu from '../../util/qiniu'

const qiniu = Qiniu.create()

async function postCreateBucket(req: fastify.FastifyRequest<IncomingMessage>, reply: fastify.FastifyReply<ServerResponse>) {
    try{
        const data = await qiniu.postBucket('test02-jianglei')
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

export {
    postCreateBucket,
    getBucketList
}