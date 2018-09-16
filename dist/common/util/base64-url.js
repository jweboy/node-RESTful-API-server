"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function encode(str, code = 'base64') {
    const buff = new Buffer(str);
    const encodeStr = buff.toString(code);
    return encodeStr;
}
exports.encode = encode;
function decode(str, formCode = 'base64', toCode = 'ascii') {
    const buff = new Buffer(str, formCode);
    const decodeStr = buff.toString(toCode);
    return decodeStr;
}
exports.decode = decode;
//# sourceMappingURL=base64-url.js.map