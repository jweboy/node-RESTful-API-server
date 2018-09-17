import { Module } from '@nestjs/common';
import { BucketModule } from './bucket/bucket.module';
import { FileModule } from './file/file.module';

// 组织应用程序结构

@Module({
  imports: [BucketModule, FileModule],
  controllers: [],
  providers: [],
})
export class QiniuModule {}
