import { ServerResponse } from 'http'
import * as CreateError from 'http-errors'
import * as rp from 'request-promise'

// https://github.com/request/request-promise
// https://www.npmjs.com/package/http-errors

interface ErrorException extends Error {
    statusCode?: number | string,
    message: string,
}

interface RequestOptions {
    method: string,
    uri: string,
    json: boolean,
    body?: Object,
    form?: Object
}
    
function request(opts: RequestOptions) {
    const defaultOpts = {
        json: true,
        method: 'GET'
    }
    return rp({ ...defaultOpts, ...opts })
        .then((body: ServerResponse) => body)
        .catch(function(err: ErrorException) {
            console.log('err', err.message, err.statusCode);
            if (err.statusCode === 400) {
                throw new CreateError.BadRequest(err.message)
            }
            if(err.statusCode === 500) {
                throw new CreateError.InternalServerError(err.message)
            }
        })
}
    

export default request