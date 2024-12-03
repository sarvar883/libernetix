import React, { useState } from 'react';
import { pay } from '../actions/payment';
import { validatePaymentData, ValidationResponse } from '../utils/validate-payment-form';
import { PaymentData, Currency, PaymentType } from '../types';

const PaymentForm = () => {
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<Currency>(Currency.EUR);
  const [paymentType, setPaymentType] = useState<PaymentType>(PaymentType.Payform);
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardHolderName, setCardHolderName] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [securityCode, setSecurityCode] = useState<string>('');

  const onChangeExpirationDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let content: string = e.target.value || '';

    if (content.length > expirationDate.length && content.length === 2) {
      setExpirationDate(`${content}/`);
      return;
    }

    setExpirationDate(e.target.value);
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: PaymentData = {
      amount: Number(amount),
      currency,
      paymentType,
      cardNumber,
      cardHolderName,
      expirationDate,
      securityCode,
    };

    const validationResponse: ValidationResponse = validatePaymentData(data);

    if (!validationResponse.success) {
      alert(validationResponse.error.message);
      return;
    }

    pay(data);
  };

  return (
    <div className='payment-form mt-2'>
      <form onSubmit={onSubmit}>
        <h1 className='text-center'>Payment Form</h1>

        <div className="row">
          <div className="col-6">
            <div className="mb-3 mt-3">
              <label htmlFor="cardNumber" className="form-label m-0">Amount</label>
              <input
                type="number"
                name="amount"
                className="form-control mt-0"
                value={amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-6">
            <div className="mb-3 mt-3">
              <label htmlFor="cardNumber" className="form-label m-0">Currency</label>
              <input
                type="text"
                name="currency"
                className="form-control mt-0"
                value={currency}
                list="currency"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrency(e.target.value as Currency)}
                required
              />
              <datalist id="currency">
                <option value={Currency.EUR} />
                <option value={Currency.USD} />
              </datalist>
            </div>
          </div>
        </div>

        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="paymentType"
            value={PaymentType.Payform}
            defaultChecked={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentType(e.target.value as PaymentType)}
          />
          <label className="form-check-label" htmlFor="inlineRadio1">{PaymentType.Payform}</label>
        </div>

        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="paymentType"
            value={PaymentType.S2S}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentType(e.target.value as PaymentType)}
          />
          <label className="form-check-label" htmlFor="inlineRadio2">{PaymentType.S2S}</label>
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="cardNumber" className="form-label m-0">Card Number</label>
          <input
            type="number"
            name="cardNumber"
            className="form-control"
            value={cardNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardNumber(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="cardHolderName" className="form-label m-0">Cardholder Number</label>
          <input
            type="text"
            name="cardHolderName"
            className="form-control"
            value={cardHolderName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardHolderName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="expirationDate" className="form-label m-0">Expiration Date</label>
          <input
            type="text"
            name="expirationDate"
            className="form-control"
            value={expirationDate}
            placeholder='MM/YY'
            maxLength={5}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeExpirationDate(e)}
            required
          />
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="securityCode" className="form-label m-0">Security Code</label>
          <input
            type="number"
            name="securityCode"
            className="form-control"
            value={securityCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecurityCode(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Pay</button>
      </form>
    </div>
  )
}

export default PaymentForm;