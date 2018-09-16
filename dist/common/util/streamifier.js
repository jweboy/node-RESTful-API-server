"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const stream = require("stream");
const MultiStream = function (object, options) {
    if (object instanceof Buffer || typeof object === 'string') {
        options = options || {};
        stream.Readable.call(this, {
            highWaterMark: options.highWaterMark,
            encoding: options.encoding,
        });
    }
    else {
        stream.Readable.call(this, { objectMode: true });
    }
    this._object = object;
};
MultiStream.prototype._read = function () {
    this.push(this._object);
    this._object = null;
};
util.inherits(MultiStream, stream.Readable);
exports.streamifier = {
    createReadStream(object, options = {}) {
        return new MultiStream(object, options);
    },
};
//# sourceMappingURL=streamifier.js.map