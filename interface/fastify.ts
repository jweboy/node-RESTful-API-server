import * as fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse, ServerRequest } from 'http'

interface Fastify {
    request: fastify.FastifyRequest<ServerRequest>;
    reply: fastify.FastifyReply<ServerResponse>;
    next: (param?: any) => void;
    options: fastify.RouteShorthandOptions;
    instance: fastify.FastifyInstance;
    server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>;
}

export default Fastify
