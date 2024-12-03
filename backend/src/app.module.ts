import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { PaymentModule } from './domain/payment-service';
import { TransactionModule } from './domain/transactions';
import { TransactionRepositoryModule } from './infrastructure/transactions-repo';
import { LibernetixClientModule } from './infrastructure/libernetix-client';
import { SchedulerService } from './infrastructure/scheduler-service';

import { ConfigModule } from '@nestjs/config';
import { getConfigs } from './infrastructure/config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [getConfigs] }),
    TransactionRepositoryModule,
    PaymentModule,
    TransactionModule,
    LibernetixClientModule,
  ],
  controllers: [AppController],
  providers: [SchedulerService],
})
export class AppModule {} 