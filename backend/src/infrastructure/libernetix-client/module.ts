import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { getConfigs } from '../config';

import { LibernetixClient } from './service';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [getConfigs] }),
  ],
  providers: [
    {
      provide: LibernetixClient,
      useFactory: (configService: ConfigService) => new LibernetixClient(configService),
      inject: [ConfigService],
    },
  ],
  exports: [LibernetixClient],
})
export class LibernetixClientModule {}