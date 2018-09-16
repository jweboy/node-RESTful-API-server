"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class BadRequestException extends common_1.HttpException {
    constructor() {
        super('请求参数不全导致错误', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.BadRequestException = BadRequestException;
//# sourceMappingURL=bad-request.exception.js.map