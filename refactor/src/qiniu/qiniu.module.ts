// import { Module, NestModule, MiddlewareConsumer, HttpModule } from '@nestjs/common';
// import { BucketController } from './bucket/bucket.controller';
// import { BucketService } from './bucket/bucket.service';

// // 组织应用程序结构

// @Module({
//   imports: [HttpModule],
//   controllers: [BucketController],
//   providers: [BucketService],
// })
// export class BucketModule implements NestModule{
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(BucketRequestMiddlware)
//       .with('https://rs.qbox.me/buckets')
//       .forRoutes(BucketController);
//   }
// }