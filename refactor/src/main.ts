import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { FastifyAdapter } from '@nestjs/core/adapters';

async function startService() {
  // 采用fastify内核，性能上基准测试高于express两倍。
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  // 开启cors跨域模块
  app.enableCors();
  // 设置路由前缀
  app.setGlobalPrefix('api');
  // 监听默认端口
  await app.listen(3000);
}
startService();
