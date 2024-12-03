import { Module } from '@nestjs/common';
import { TransactionRepository } from './service';

@Module({
  providers: [TransactionRepository],
  exports: [TransactionRepository],
})
export class TransactionRepositoryModule {}