import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ErrorFilter } from './common/exceptions/error.filter';
// import { FastifyAdapter } from '@nestjs/core/adapters';

async function startService() {
  // 采用fastify内核，性能上基准测试高于express两倍。
  // FIXME: 当应用庞大时候，在切换fastify作基准测试，目前以exppress为主。
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('RESTful-API')
    .setVersion('1.0')
    .setBasePath('/api')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  // 开启cors跨域模块
  app.enableCors();

  // 设置路由前缀
  app.setGlobalPrefix('api');

  // 异常处理
  app.useGlobalFilters(new ErrorFilter());

  // 监听默认端口
  await app.listen(3000);
}
startService();
