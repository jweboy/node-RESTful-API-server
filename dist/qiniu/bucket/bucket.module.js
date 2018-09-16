"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const bucket_controller_1 = require("./bucket.controller");
const bucket_service_1 = require("./bucket.service");
const logger_middleware_1 = require("../../common/middlewares/logger.middleware");
let BucketModule = class BucketModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .with('BucketController')
            .forRoutes(bucket_controller_1.BucketController);
    }
};
BucketModule = __decorate([
    common_1.Module({
        imports: [common_1.HttpModule],
        controllers: [bucket_controller_1.BucketController],
        providers: [bucket_service_1.BucketService],
    })
], BucketModule);
exports.BucketModule = BucketModule;
//# sourceMappingURL=bucket.module.js.map