import * as fastify from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'
import Qiniu from '../../util/qiniu'

export default async function postAccessToken(req: fastify.FastifyRequest<IncomingMessage>, reply: fastify.FastifyReply<ServerResponse>) {
    const qiniu = new Qiniu('1', '3')
    try{
        const token = await qiniu.getAccessToken()
        console.log('token');
        reply.send(token)
    } catch(err) {
        reply.send(err)
    }
}