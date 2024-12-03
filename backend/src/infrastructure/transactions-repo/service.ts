import * as path from 'path';
import * as fs from 'node:fs/promises';
import * as Crypto from 'crypto';
import { Injectable } from '@nestjs/common';

import { Timestamp, Milliseconds } from '../../utils/aliases';
import { Transaction, State, CreateInput } from '../../domain/transactions';

@Injectable()
export class TransactionRepository {
  // !! for simplicity, I am using json file as a database.
  // in real world app, of course I would use DBMS
  private readonly path: string;
  private readonly debounceTimeAfterCreate: Milliseconds;

  constructor() {
    this.path = path.resolve('./src/infrastructure/transactions-repo/transactions.json');
    this.debounceTimeAfterCreate = 3 * 1000;
  }

  private generateId(): string {
    return Crypto.randomBytes(20).toString('hex');
  }

  async create(data: CreateInput): Promise<Transaction> {
    const currentTimestamp: Timestamp = Date.now();
    const processTime: Timestamp = currentTimestamp + this.debounceTimeAfterCreate;

    const transaction: Transaction = {
      _id: this.generateId(),
      paymentData: {
        amount: data.amount,
        currency: data.currency,
        paymentType: data.paymentType,
        cardNumber: data.cardNumber,
        cardHolderName: data.cardHolderName,
        expirationDate: data.expirationDate,
        securityCode: data.securityCode,
      },
      state: State.Created,
      createdAt: currentTimestamp,
      processTime,
    };

    const allTransactions: Transaction[] = await this.readDatabase();

    allTransactions.push(transaction)

    await fs.writeFile(this.path, JSON.stringify(allTransactions));

    return transaction;
  }

  async update(transactionId: string, data: Record<string, any>): Promise<void> {
    const allTransactions = await this.readDatabase();

    const foundTransactionIndex: number = allTransactions.findIndex(item => item._id === transactionId);

    allTransactions[foundTransactionIndex] = {
      ...allTransactions[foundTransactionIndex],
      ...data,
    };

    await fs.writeFile(this.path, JSON.stringify(allTransactions));
  }

  async getAll(): Promise<Transaction[]> {
    return await this.readDatabase();
  }

  async getActualByState(state: State): Promise<Transaction[]> {
    const allTransactions: Transaction[] = await this.readDatabase();

    const currentTimestamp: Timestamp = Date.now();

    return allTransactions.filter(item =>
      item.state === state &&
      currentTimestamp > item.processTime
    );
  }

  private async readDatabase(): Promise<Transaction[]> {
    const dataRaw: string = await fs.readFile(this.path, 'utf8');

    const data: Transaction[] = JSON.parse(dataRaw);

    return data;
  }
}