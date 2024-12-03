import { Module } from '@nestjs/common';

import { TransactionRepositoryModule } from '../../infrastructure/transactions-repo';

import { TransactionService } from './service';

@Module({
  imports: [TransactionRepositoryModule],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}