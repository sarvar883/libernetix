import axios from 'axios';
import { PaymentData } from '../types';

export async function pay(data: PaymentData) {
  // todo: store urls in env or some config module
  const url: string = `localhost:3001`;

  // todo: add config headers for security
  try {
    await axios.post(url, data);
    alert('Ther transaction is being executed. Please checl the status later');
  } catch (error) {
    alert('Error while sending request. Please try again');
  }
};