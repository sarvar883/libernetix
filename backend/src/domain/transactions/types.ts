import { Timestamp } from '../../utils/aliases';
import { PaymentData } from '../../types';

export enum State {
  Created = 1,
  Pending = 30,
  Error = 50,
  Success = 100,
}

export type ValidationResponse = {
  valid: boolean;
  message: string;
}

export type Transaction = {
  _id: string;
  paymentData: CreateInput;
  state: State;
  createdAt: Timestamp;
  processTime: Timestamp;
  setPendingAt?: Timestamp;
  finishedAt?: Timestamp;
  erroredAt?: Timestamp;
}

export type CreateInput = PaymentData & {}