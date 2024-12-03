import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { PaymentService } from './domain/payment-service/service';
import { PaymentData } from './types';
import { TransactionService, ValidationResponse, Transaction } from './domain/transactions';

@Controller('api')
export class AppController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly transactionService: TransactionService,
  ) {}

  @Post('/pay')
  async pay(@Body() body: PaymentData) {
    // todo: add authorization
    console.log('AppController pay body =', body);
    const validationResponse: ValidationResponse = this.transactionService.validatePaymentData(body);

    if (!validationResponse.valid) {
      throw new BadRequestException(validationResponse.message);
    }

    const createdTransaction: Transaction = await this.transactionService.create(body);

    await this.paymentService.processPayment(createdTransaction);

    return {
      message: 'Got it. We are processing the transaction',
    };
  }
}