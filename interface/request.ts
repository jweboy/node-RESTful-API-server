interface Headers {
    'content-type'?: string;
    'user-agent'?: string;
    Authorization?: string;
}

interface RequestOptions {
    method?: string;
    uri: string;
    json?: boolean;
    body?: object;
    form?: object;
    headers?: Headers;
}

export default RequestOptions
