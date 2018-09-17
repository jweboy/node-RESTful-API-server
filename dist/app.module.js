"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const path = __importStar(require("path"));
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const qiniu_module_1 = require("./qiniu/qiniu.module");
const config_module_1 = require("./config/config.module");
const config_service_1 = require("./config/config.service");
const envFile = path.join(__dirname, `common/env/${process.env.NODE_ENV}.env`);
const configService = new config_service_1.ConfigService(envFile);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                port: 3306,
                host: configService.envConfig.MYSQL_HOST,
                username: configService.envConfig.MYSQL_USERNAME,
                password: configService.envConfig.MYSQL_HOST,
                database: configService.envConfig.MYSQL_DATABASE,
                entities: ['src/**/**.entity{.ts,.js}'],
                synchronize: true,
            }),
            qiniu_module_1.QiniuModule,
            config_module_1.ConfigModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map