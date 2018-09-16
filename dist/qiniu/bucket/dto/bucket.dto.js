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
class CreateBucketDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateBucketDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        default: 'z0',
        description: '存储区域,默认有(华东)z0、(华北)z1、(华南)z2、(北美)na0、(东南亚)as0',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateBucketDto.prototype, "region", void 0);
exports.CreateBucketDto = CreateBucketDto;
class DeleteBucketDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DeleteBucketDto.prototype, "name", void 0);
exports.DeleteBucketDto = DeleteBucketDto;
//# sourceMappingURL=bucket.dto.js.map