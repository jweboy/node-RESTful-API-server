import * as util from 'util';
import * as stream from 'stream';

// TODO: 需要一些code review

const MultiStream = function(object, options) {
  if (object instanceof Buffer || typeof object === 'string') {
    options = options || {};
    stream.Readable.call(this, {
      highWaterMark: options.highWaterMark,
      encoding: options.encoding,
    });
  } else {
    stream.Readable.call(this, { objectMode: true });
  }
  this._object = object;
};

MultiStream.prototype._read = function() {
  this.push(this._object);
  this._object = null;
};

util.inherits(MultiStream, stream.Readable);

interface Options{
  encoding?: string;
  highWaterMark?: number;
}

export const streamifier = {
  createReadStream(object, options: Options = {}) {
    return new MultiStream (object, options);
  },
};
