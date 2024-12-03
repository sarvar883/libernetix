export type PaymentData = {
  amount: number;
  currency: Currency;
  paymentType: PaymentType;
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  securityCode: string;
};

export enum Currency {
  EUR = 'EUR',
  USD = 'USD',
}

export enum PaymentType {
  Payform = 'Payform',
  S2S = 'S2S',
}