import { Injectable, OnApplicationShutdown } from '@nestjs/common';

import { State, Transaction, TransactionService } from '../../domain/transactions';
import { PaymentService } from '../../domain/payment-service';

import { Milliseconds } from '../../utils/aliases';
import { sleep } from '../../utils/sleep';

// !! this scheduler is an infinite loop that continuously looks for
// pending transactions in the DB and tries to process them.
// Ideally, the scheduler does not process them itself. The scheduler just assings
// the task to a worker and processing is executed on another thread

@Injectable()
export class SchedulerService implements OnApplicationShutdown {
  // scheduler to handle pending transactions
  private isRunning: boolean = true;
  // the loop executes every 5 seconds
  private readonly sleepTime: Milliseconds = 5 * 1000;

  constructor(
    private readonly transactionService: TransactionService,
    private readonly paymentService: PaymentService,
  ) {}

  async start(): Promise<void> {
    console.log('SchedulerService started');

    while (this.isRunning) {
      console.log('SchedulerService iteration');
      try {
        await this.execute();
      } catch (e) {
        console.log('SchedulerService start catch e =', e);
      }

      await sleep(this.sleepTime);
    }
  }

  private async execute(): Promise<void> {
    // pending transactions that need to be processed
    const actualTransactions: Transaction[] = await this.transactionService.getActualByState(State.Pending);

    if (!actualTransactions.length) {
      console.log('SchedulerService no actualTransactions');
      return;
    }

    console.log('SchedulerService actualTransactions found =', actualTransactions.length);

    for (let i = 0; i < actualTransactions.length; i++) {
      let currentTransaction: Transaction = actualTransactions[i];

      await this.paymentService.processPayment(currentTransaction);
    }
  }

  stopLoop() {
    this.isRunning = false;
    console.log('SchedulerService stopped');
  }

  onApplicationShutdown() {
    this.stopLoop();
  }
}