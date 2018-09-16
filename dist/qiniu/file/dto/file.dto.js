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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class GetFileDto {
}
__decorate([
    swagger_1.ApiModelProperty({
        description: '文件存储的镜像空间名',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], GetFileDto.prototype, "bucket", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        description: '页码',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", Number)
], GetFileDto.prototype, "page", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        description: '页数',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", Number)
], GetFileDto.prototype, "size", void 0);
exports.GetFileDto = GetFileDto;
class PostFileDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PostFileDto.prototype, "bucket", void 0);
exports.PostFileDto = PostFileDto;
class DeleteFileDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DeleteFileDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DeleteFileDto.prototype, "bucket", void 0);
exports.DeleteFileDto = DeleteFileDto;
//# sourceMappingURL=file.dto.js.map