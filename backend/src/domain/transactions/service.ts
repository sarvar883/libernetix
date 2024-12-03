import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../infrastructure/transactions-repo';
import { ValidationResponse, CreateInput, Transaction, State } from './types';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  validatePaymentData(data: CreateInput): ValidationResponse {
    if (!data) {
      return { valid: false, message: 'No data is received' };
    }

    if (!data.amount || typeof data.amount !== 'number' || !isFinite(data.amount)) {
      return { valid: false, message: 'amount is invalid' };
    }

    if (!data.currency || typeof data.currency !== 'string') {
      return { valid: false, message: 'currency is invalid' };
    }

    if (!data.paymentType || typeof data.paymentType !== 'string') {
      return { valid: false, message: 'paymentType is invalid' };
    }

    if (!data.cardNumber || typeof data.cardNumber !== 'string') {
      return { valid: false, message: 'cardNumber is invalid' };
    }

    if (!data.cardHolderName || typeof data.cardHolderName !== 'string') {
      return { valid: false, message: 'cardHolderName is invalid' };
    }

    if (!data.expirationDate || typeof data.expirationDate !== 'string') {
      return { valid: false, message: 'expirationDate is invalid' };
    }

    if (!data.securityCode || typeof data.securityCode !== 'string') {
      return { valid: false, message: 'securityCode is invalid' };
    }

    return { valid: true, message: 'Valid' };
  }

  async create(params: CreateInput): Promise<Transaction> {
    console.log('TransactionService create');
    return await this.transactionRepository.create(params);
  }

  async setSuccessStatus(transactionId: string): Promise<void> {
    const updateData: Partial<Transaction> = {
      state: State.Success,
      finishedAt: Date.now(),
    };

    await this.transactionRepository.update(transactionId, updateData);
  }

  async setPendingStatus(transactionId: string): Promise<void> {
    const updateData: Partial<Transaction> = {
      state: State.Pending,
      setPendingAt: Date.now(),
    };

    await this.transactionRepository.update(transactionId, updateData);
  }

  async setErrorStatus(transactionId: string): Promise<void> {
    const updateData: Partial<Transaction> = {
      state: State.Error,
      erroredAt: Date.now(),
    };

    await this.transactionRepository.update(transactionId, updateData);
  }

  async getActualByState(state: State): Promise<Transaction[]> {
    return await this.transactionRepository.getActualByState(state);
  }
}