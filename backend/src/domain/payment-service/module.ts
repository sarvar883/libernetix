import { Module } from '@nestjs/common';
import { PaymentService } from './service';

import { ConfigModule } from '@nestjs/config';
import { getConfigs } from '../../infrastructure/config';

import { LibernetixClientModule } from '../../infrastructure/libernetix-client';
import { TransactionModule } from '../transactions';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [getConfigs] }),
    LibernetixClientModule,
    TransactionModule,
  ],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}