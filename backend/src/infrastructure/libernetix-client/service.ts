import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CreateInput } from '../../domain/transactions';
import { CreatePaymentBody, Status, ApiResponse, CreateResponse } from './types';

@Injectable()
export class LibernetixClient {
  constructor(
    private readonly config: ConfigService,
  ) {}

  async createPayment(params: CreateInput): Promise<CreateResponse> {
    const baseUrl: string = this.config.get('libernetix.baseUrl');
    const url: string = `${baseUrl}/purchases`;

    const body: CreatePaymentBody = {
      cardholder_name: params.cardHolderName,
      card_number: params.cardNumber,
      expires: params.expirationDate,
      cvc: params.securityCode,
      remember_card: 'on',
      remote_ip: '127.0.0.1',
    };

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.get('libernetix.apiKey')}`,
      },
      params: {
        s2s: true,
      },
    };

    try {
      const res: AxiosResponse<ApiResponse> = await Axios.post(url, body, config);

      if (res.data.status === Status.Executed) {
        return {
          success: true,
          data: {
            status: Status.Executed,
          },
        };
      }

      return {
        success: true,
        data: {
          status: res.data.status,
        },
      }

    } catch (e) {
      const error = {
        status: e?.status,
        message: e?.message,
        data: e?.response?.data,
      };

      return {
        success: false,
        error,
      };
    }
  }
}