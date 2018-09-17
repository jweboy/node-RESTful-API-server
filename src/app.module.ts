import { Module } from '@nestjs/common';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QiniuModule } from './qiniu/qiniu.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

const envFile = path.join(__dirname, `common/env/${process.env.NODE_ENV}.env`);
const configService: any = new ConfigService(envFile);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: configService.envConfig.MYSQL_HOST,
      username: configService.envConfig.MYSQL_USERNAME,
      password: configService.envConfig.MYSQL_HOST,
      database: configService.envConfig.MYSQL_DATABASE,
      entities: ['src/**/**.entity{.ts,.js}'],
      synchronize: true,
    }),
    QiniuModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
