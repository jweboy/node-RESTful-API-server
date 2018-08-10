import { IncomingHttpHeaders } from 'http'

// TODO: 這裡可以繼承HTTP

interface RequestOptions {
    method?: string;
    uri: string;
    json?: boolean;
    body?: object;
    form?: object;
    headers?: IncomingHttpHeaders;
}

export default RequestOptions
