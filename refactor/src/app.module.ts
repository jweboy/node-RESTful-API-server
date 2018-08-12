import { Module, NestModule, MiddlewareConsumer, UseFilters } from '@nestjs/common';
import { AppController } from 'app.controller';
import { BucketModule } from './qiniu/bucket/bucket.module';
import { AppService } from 'app.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { BucketController } from './qiniu/bucket/bucket.controller';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Module({
  imports: [BucketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .with('BucketController')
      .forRoutes(BucketController);
  }
}
