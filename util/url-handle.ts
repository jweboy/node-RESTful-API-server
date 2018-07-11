interface UrlHandler {
    encode: Function,
    decode: Function
}

const handler: UrlHandler =  {
    encode(str: string, code: string = 'base64'): string {
        const buff = new Buffer(str);  
        const encodeStr = buff.toString(code)
        return encodeStr
    },
    decode(str: string, formCode: string = 'base64', toCode: string = 'ascii'): string {
        const buff = new Buffer(str, formCode)
        const decodeStr = buff.toString(toCode)
        return decodeStr
    }
}

export default handler