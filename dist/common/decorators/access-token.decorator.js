"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const qiniu = require("qiniu");
const data = require("../config/qiniu-key.json");
exports.getAccessToken = (uri) => qiniu.util.generateAccessToken(data, uri);
exports.AccessToken = common_1.createParamDecorator(uri => exports.getAccessToken(uri));
//# sourceMappingURL=access-token.decorator.js.map