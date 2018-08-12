import { Module, NestModule, MiddlewareConsumer, HttpModule } from '@nestjs/common';
import { BucketController } from './bucket.controller';
import { BucketService } from './bucket.service';
import { BucketRequestMiddlware } from './bucket.middleware';

// 组织应用程序结构

@Module({
  imports: [HttpModule],
  controllers: [BucketController],
  providers: [BucketService],
})
export class BucketModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BucketRequestMiddlware)
      .with('https://rs.qbox.me/buckets')
      .forRoutes(BucketController);
  }
}