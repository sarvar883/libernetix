export type CreatePaymentBody = {
  cardholder_name: string;
  card_number: string;
  expires: string;
  cvc: string;
  remember_card?: string;
  remote_ip: string;
  // other params might be added
}

export enum Status {
  Executed = 'executed',
  Authorized = 'authorized',
  Pending = 'pending',
  DS3_Required = '3DS_required',
  Error = 'error',
}

export type ApiResponse = {
  status: Status;
}

export type CreateResponse = CreateSuccessResponse | CreateErrosResponse;

export type CreateSuccessResponse = {
  success: true;
  data: {
    status: Status;
  };
}

export type CreateErrosResponse = {
  success: false;
  error: {

  };
}