import { PaymentData } from '../types';

export type ValidationResponse = ValidationPassed | ValidationFailed;

export type ValidationPassed = {
  success: true;
}

export type ValidationFailed = {
  success: false;
  error: {
    message: string;
  };
}

export function validatePaymentData(paymentData: PaymentData): ValidationResponse {
  if (!isExpirationDateValid(paymentData.expirationDate)) {
    return {
      success: false,
      error: {
        message: 'Incorrect expiration date',
      },
    };
  }

  // todo: add more validation if necessary

  return { success: true };
}

function isExpirationDateValid(expiration: string): boolean {
  const month: number = Number(expiration.split('/')[0]);

  if (month > 12) {
    return false;
  }

  return true;
}