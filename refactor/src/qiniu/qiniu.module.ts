import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BucketModule } from './bucket/bucket.module';

// 组织应用程序结构

@Module({
  imports: [BucketModule],
  controllers: [],
  providers: [],
})

export class QiniuModule{}