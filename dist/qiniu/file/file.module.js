"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const logger_middleware_1 = require("../../common/middlewares/logger.middleware");
const file_controller_1 = require("./file.controller");
const file_service_1 = require("./file.service");
const file_entity_1 = require("./file.entity");
let FileModule = class FileModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .with('FileController')
            .forRoutes(file_controller_1.FileController);
    }
};
FileModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([file_entity_1.FileEntity])],
        controllers: [file_controller_1.FileController],
        providers: [file_service_1.FileService],
    })
], FileModule);
exports.FileModule = FileModule;
//# sourceMappingURL=file.module.js.map