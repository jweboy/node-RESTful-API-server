"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const qiniu = __importStar(require("qiniu"));
const path = __importStar(require("path"));
const config_service_1 = require("../../config/config.service");
exports.getAccessToken = (uri) => {
    const envFile = path.join(__dirname, '../env/qiniu.env');
    const configService = new config_service_1.ConfigService(envFile);
    return qiniu.util.generateAccessToken({
        accessKey: configService.envConfig.QINIU_ACCESSKEY,
        secretKey: configService.envConfig.QINIU_SECRETKEY,
    }, uri);
};
exports.AccessToken = common_1.createParamDecorator(uri => exports.getAccessToken(uri));
//# sourceMappingURL=access-token.decorator.js.map