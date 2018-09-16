"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const file_service_1 = require("./file.service");
const file_dto_1 = require("./dto/file.dto");
const validation_pipe_1 = require("../../common/pipes/validation.pipe");
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    postOne(body, file) {
        const { bucket } = body;
        return this.fileService.postOne(bucket, file);
    }
    getAll(query) {
        return this.fileService.getAll(query);
    }
    deleteOne(body) {
        const { name, bucket } = body;
        return this.fileService.deleteOne(name, bucket);
    }
};
__decorate([
    common_1.Post(),
    common_1.UseInterceptors(common_1.FileInterceptor('file')),
    common_1.UsePipes(validation_pipe_1.ValidationPipe),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_dto_1.PostFileDto, Object]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "postOne", null);
__decorate([
    common_1.Get(),
    common_1.UsePipes(validation_pipe_1.ValidationPipe),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_dto_1.GetFileDto]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "getAll", null);
__decorate([
    common_1.HttpCode(204),
    common_1.Delete(),
    common_1.UsePipes(validation_pipe_1.ValidationPipe),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_dto_1.DeleteFileDto]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "deleteOne", null);
FileController = __decorate([
    swagger_1.ApiUseTags('qiniu'),
    common_1.Controller('qiniu/file'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map