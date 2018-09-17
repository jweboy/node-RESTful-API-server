import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QiniuModule } from './qiniu/qiniu.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot(),
    QiniuModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
