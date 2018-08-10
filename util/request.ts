import { ServerResponse } from 'http'
import * as CreateError from 'http-errors'
import * as rp from 'request-promise'
import ErrorException from 'interface/error'
import RequestOptions from 'interface/request'

// https://github.com/request/request-promise
// https://www.npmjs.com/package/http-errors

function request(opts: RequestOptions) {
    const defaultOpts = {
        json: true,
        method: 'GET',
    }
    return rp({ ...defaultOpts, ...opts })
        .then((body: ServerResponse) => body)
        .catch(function errorHandler(err: ErrorException) {
            // console.log('err', err.message, err.statusCode);
            if (!err.statusCode) {
                throw new CreateError.InternalServerError(err.message)
            }
            if (err.statusCode === 400) {
                throw new CreateError.BadRequest(err.message)
            }
            if (err.statusCode === 401) {
                throw new CreateError.Unauthorized(err.message)
            }
            if (err.statusCode === 500) {
                throw new CreateError.InternalServerError(err.message)
            }
            if (err.statusCode > 500) {
                throw err
            }
        })
}
    
export default request
