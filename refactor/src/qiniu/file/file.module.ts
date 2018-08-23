import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from '../../common/middlewares/logger.middleware';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
    controllers: [FileController],
    providers: [FileService],
    exports: [FileService]
})
export class FileModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .with('FileController')
            .forRoutes(FileController);
    }
}