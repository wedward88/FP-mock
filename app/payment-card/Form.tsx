'use client';
import { useEffect, useState } from 'react';

type FormData = {
  number: string;
  name: string;
  expiration: string;
  cvv: string;
};

const CardForm = () => {
  const defaultFormData: FormData = {
    number: '',
    name: '',
    expiration: '',
    cvv: '',
  };

  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // const result = await response.json();
    // console.log('Transaction ID:', result.id);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9\s]{13,19}"
        autoComplete="cc-number"
        max="19"
        placeholder="xxxx xxxx xxxx xxxx"
        name="number"
        className="input"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        placeholder="John Doe"
        name="name"
        className="input"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        placeholder="MM/DD"
        name="expiration"
        className="input"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        placeholder="CVV"
        name="cvv"
        className="input"
        onChange={handleChange}
        required
      />
      <button className="btn">Submit</button>
    </form>
  );
};

export default CardForm;
