import { Injectable } from '@nestjs/common';

import { LibernetixClient, CreateResponse, Status } from 'src/infrastructure/libernetix-client';
import { TransactionService, Transaction, CreateInput } from '../transactions';

@Injectable()
export class PaymentService {
  constructor(
    private readonly libernetixClient: LibernetixClient,
    private readonly transactionService: TransactionService,
  ) {}

  async processPayment(transaction: Transaction): Promise<void> {
    try {
      await this.createPayment(transaction);
    } catch (e) {
      console.log('PaymentService processPayment catch e =', e);
    }
  }

  async createPayment(transaction: Transaction): Promise<void> {
    const createParams: CreateInput = transaction.paymentData;
    const createResponse: CreateResponse = await this.libernetixClient.createPayment(createParams);

    if (!createResponse.success) {
      await this.transactionService.setErrorStatus(transaction._id);
      return;
    }

    if (createResponse.data.status === Status.Executed) {
      await this.transactionService.setSuccessStatus(transaction._id);
    }

    if (createResponse.data.status === Status.Pending) {
      await this.transactionService.setPendingStatus(transaction._id);
    }

    // if something unexpected happened, set the pending status and check transaction after some time
    await this.transactionService.setPendingStatus(transaction._id);
  }
}