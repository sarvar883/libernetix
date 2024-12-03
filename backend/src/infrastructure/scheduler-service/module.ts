import { Module } from '@nestjs/common';
import { SchedulerService } from './service';

import { TransactionModule } from '../../domain/transactions';
import { PaymentModule } from '../../domain/payment-service';

@Module({
  imports: [PaymentModule, TransactionModule],
  providers: [SchedulerService],
  exports: [SchedulerService],
})
export class SchedulerModule {}