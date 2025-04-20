'use client';
import { useState } from 'react';

import { CardData } from '../types/types';

interface CardFormProps {
  onSubmit: (event: React.FormEvent, formData: CardData) => void;
}
const CardForm = ({ onSubmit }: CardFormProps) => {
  const defaultFormData: CardData = {
    number: '',
    name: '',
    expirMonth: '',
    expirYear: '',
    cvv: '',
    amount: '',
  };

  const [formData, setFormData] = useState<CardData>(defaultFormData);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    // Only allow numbers and decimal points for the below fields
    const numericFields = [
      'expirMonth',
      'expirYear',
      'cvv',
      'amount',
    ];
    let formattedValue = numericFields.includes(name)
      ? value.replace(/[^\d.]/g, '') // removes non-digits
      : value;

    // Format card number as XXXX XXXX XXXX XXXX
    if (name === 'number') {
      // Remove all non-digit characters
      const digits = value.replace(/\D/g, '');

      // Group into chunks of 4
      formattedValue = digits.match(/.{1,4}/g)?.join(' ') ?? '';
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  return (
    <form
      onSubmit={(event) => onSubmit(event, formData)}
      className="flex flex-col space-y-5"
    >
      <p className="label">Card Number</p>
      <input
        type="text"
        inputMode="numeric"
        autoComplete="cc-number"
        maxLength={19}
        placeholder="xxxx xxxx xxxx xxxx"
        name="number"
        value={formData.number}
        className="input"
        onChange={handleChange}
        required
      />
      <p className="label">Cardholder Name</p>
      <input
        type="text"
        placeholder="John Doe"
        name="name"
        className="input"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <p className="label">Expiration Date</p>
      <div className="flex space-x-5">
        <input
          type="text"
          inputMode="numeric"
          placeholder="MM"
          name="expirMonth"
          className="input"
          maxLength={2}
          value={formData.expirMonth}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="YY"
          inputMode="numeric"
          name="expirYear"
          className="input"
          maxLength={2}
          value={formData.expirYear}
          onChange={handleChange}
          required
        />
      </div>
      <p className="label">CVV</p>
      <input
        type="text"
        placeholder="xxx"
        inputMode="numeric"
        name="cvv"
        className="input"
        maxLength={4}
        value={formData.cvv}
        onChange={handleChange}
        required
      />
      <p className="label">Amount</p>
      <input
        type="text"
        inputMode="numeric"
        placeholder="0.00"
        name="amount"
        className="input"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <button className="btn">Submit</button>
    </form>
  );
};

export default CardForm;
