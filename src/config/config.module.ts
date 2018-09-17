import { Module } from '@nestjs/common';
import path from 'path';
import { ConfigService } from './config.service';

const envFile = path.join(
  __dirname,
  `../common/env/${process.env.NODE_ENV}.env`,
);

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(envFile),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
