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
const common_1 = require("@nestjs/common");
let BucketService = class BucketService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    createOne(uri, token) {
        return this.httpService.post(uri, {}, {
            headers: {
                authorization: token,
            },
        });
    }
    findAll(uri, token) {
        return this.httpService.get(uri, {
            headers: {
                authorization: token,
            },
        });
    }
    delete(uri, token) {
        return this.httpService.post(uri, {}, {
            headers: {
                authorization: token,
            },
        });
    }
};
BucketService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], BucketService);
exports.BucketService = BucketService;
//# sourceMappingURL=bucket.service.js.map