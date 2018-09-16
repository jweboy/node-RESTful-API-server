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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const file_entity_1 = require("./file.entity");
const qiniu_1 = require("../../common/util/qiniu");
const pagination_1 = require("../../common/util/pagination");
let FileService = class FileService {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
        this.qiniu = new qiniu_1.default();
    }
    postOne(bucket, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileJson = (respJson) => {
                const { name } = respJson, restProps = __rest(respJson, ["name"]);
                return Object.assign({ name: decodeURI(name) }, restProps);
            };
            return this.qiniu.uploadFile(bucket, file).then((data) => __awaiter(this, void 0, void 0, function* () {
                const existData = yield this.fileRepository
                    .createQueryBuilder('file')
                    .where('file.hash = :hash', { hash: data.hash })
                    .andWhere('file.bucket = :bucket', { bucket })
                    .getOne();
                if (!!existData) {
                    return fileJson(existData);
                }
                yield this.fileRepository
                    .createQueryBuilder('file')
                    .insert()
                    .values([data])
                    .execute();
                const result = yield this.fileRepository
                    .createQueryBuilder('file')
                    .where('file.hash = :hash', { hash: data.hash })
                    .andWhere('file.bucket = :bucket', { bucket })
                    .getOne();
                return fileJson(result);
            }));
        });
    }
    getAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { offset, limit } = pagination_1.pagination(query.page, query.size);
            const [data, total] = yield this.fileRepository
                .createQueryBuilder('file')
                .where('file.bucket = :bucket', { bucket: query.bucket })
                .skip(offset)
                .take(limit)
                .getManyAndCount();
            return {
                list: data,
                totalCount: total,
            };
        });
    }
    deleteOne(name, bucket) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.qiniu.deleteFile(name, bucket).then(() => __awaiter(this, void 0, void 0, function* () {
                yield this.fileRepository
                    .createQueryBuilder('file')
                    .delete()
                    .where('name = :name', { name })
                    .execute();
                return '';
            }));
        });
    }
};
__decorate([
    __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileService.prototype, "postOne", null);
FileService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(file_entity_1.FileEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map