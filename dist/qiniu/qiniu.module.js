"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const bucket_module_1 = require("./bucket/bucket.module");
const file_module_1 = require("./file/file.module");
let QiniuModule = class QiniuModule {
};
QiniuModule = __decorate([
    common_1.Module({
        imports: [bucket_module_1.BucketModule, file_module_1.FileModule],
        controllers: [],
        providers: [],
    })
], QiniuModule);
exports.QiniuModule = QiniuModule;
//# sourceMappingURL=qiniu.module.js.map