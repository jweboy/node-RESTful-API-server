"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
class ConfigService {
    constructor(filePath) {
        this.envConfig = this.parse(filePath);
    }
    get(key) {
        return this.envConfig[key];
    }
    parse(filePath) {
        return dotenv.parse(fs.readFileSync(filePath));
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map