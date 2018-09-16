"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const extendedStatusHashTable = {
    631: '指定空间不存在',
    614: '目标资源已存在',
    612: '指定资源不存在或已被删除',
};
let ErrorFilter = class ErrorFilter {
    catch(error, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = error instanceof common_1.HttpException
            ? error.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        console.log('qiniu status:', status, error.message);
        if (status === common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
            if (~error.message.indexOf('614')) {
                response.status(614).json({
                    statusCode: 614,
                    message: extendedStatusHashTable['614'],
                    error: 'Target resource already exists',
                    timestamp: new Date().toISOString(),
                    path: request.url,
                });
            }
            if (~error.message.indexOf('631')) {
                response.status(631).json({
                    statusCode: 631,
                    message: extendedStatusHashTable['631'],
                    error: 'The specified space does not exist',
                    timestamp: new Date().toISOString(),
                    path: request.url,
                });
            }
            if (~error.message.indexOf('612')) {
                response.status(612).json({
                    statusCode: 612,
                    message: extendedStatusHashTable['612'],
                    error: 'The specified resource does not exist or has been deleted',
                    timestamp: new Date().toISOString(),
                    path: request.url,
                });
            }
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: '服务器情请求错误',
                error: 'Internal Server Error',
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }
        else {
            response.status(status).json({
                err: error.message,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }
    }
};
ErrorFilter = __decorate([
    common_1.Catch()
], ErrorFilter);
exports.ErrorFilter = ErrorFilter;
//# sourceMappingURL=error.filter.js.map