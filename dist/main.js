"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const error_filter_1 = require("./common/exceptions/error.filter");
function startService() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const options = new swagger_1.DocumentBuilder()
            .setTitle('RESTful-API')
            .setVersion('1.0')
            .setBasePath('/api')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('docs', app, document);
        app.enableCors();
        app.setGlobalPrefix('api');
        app.useGlobalFilters(new error_filter_1.ErrorFilter());
        yield app.listen(3000);
    });
}
startService();
//# sourceMappingURL=main.js.map