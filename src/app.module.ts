import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { QiniuModule } from './qiniu/qiniu.module';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    QiniuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}
