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
const url = require("url");
const bucket_service_1 = require("./bucket.service");
const access_token_decorator_1 = require("../../common/decorators/access-token.decorator");
const bucket_interceptor_1 = require("./bucket.interceptor");
const bucket_dto_1 = require("./dto/bucket.dto");
const validation_pipe_1 = require("../../common/pipes/validation.pipe");
const base64_url_1 = require("../../common/util/base64-url");
const config = require("../../common/config/qiniu-bucket.json");
const { getUri, postUri } = config;
let BucketController = class BucketController {
    constructor(bucketService) {
        this.bucketService = bucketService;
    }
    createOne(createBucket) {
        const region = createBucket.region || 'z0';
        const fullUri = url.resolve(postUri, `/mkbucketv2/${base64_url_1.encode(createBucket.name)}/region/${region}`);
        const token = access_token_decorator_1.getAccessToken(fullUri);
        return this.bucketService
            .createOne(fullUri, token)
            .toPromise()
            .then(() => '');
    }
    findAll(token) {
        return this.bucketService
            .findAll(getUri, token)
            .toPromise()
            .then(({ data }) => data);
    }
    delete(params) {
        const name = params.name;
        const fullUri = url.resolve(postUri, `/drop/${name}`);
        const token = access_token_decorator_1.getAccessToken(fullUri);
        return this.bucketService
            .delete(fullUri, token)
            .toPromise()
            .then(() => '');
    }
};
__decorate([
    common_1.Post(),
    common_1.UsePipes(validation_pipe_1.ValidationPipe),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bucket_dto_1.CreateBucketDto]),
    __metadata("design:returntype", void 0)
], BucketController.prototype, "createOne", null);
__decorate([
    common_1.UseInterceptors(bucket_interceptor_1.BucketInterceptor),
    common_1.Get(),
    __param(0, access_token_decorator_1.AccessToken(getUri)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BucketController.prototype, "findAll", null);
__decorate([
    common_1.Delete(':name'),
    common_1.HttpCode(204),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bucket_dto_1.DeleteBucketDto]),
    __metadata("design:returntype", void 0)
], BucketController.prototype, "delete", null);
BucketController = __decorate([
    swagger_1.ApiUseTags('qiniu'),
    common_1.Controller('qiniu/bucket'),
    __metadata("design:paramtypes", [bucket_service_1.BucketService])
], BucketController);
exports.BucketController = BucketController;
//# sourceMappingURL=bucket.controller.js.map