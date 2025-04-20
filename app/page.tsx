'use client';
import { useState } from 'react';

import CardForm from './payment-card/Form';
import TransactionList from './transactions/List';
import { Transaction } from './types/types';
import { encryptData } from './utils';

type TransactionIds = Transaction[];

export default function Home() {
  const [transactionIds, setTransactionIds] =
    useState<TransactionIds>([]);
  const handleSubmit = async (
    event: React.FormEvent,
    formData: any
  ) => {
    event.preventDefault();
    // Encrypt the form data
    const encryptedData = encryptData(
      formData,
      process.env.NEXT_PUBLIC_ENCRYPTION_SECRET!
    );
    // Send the encrypted data to the server
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(encryptedData),
    });

    const result = await response.json();
    setTransactionIds([...transactionIds, result]);
  };

  return (
    <div className="flex justify-around m-10 ">
      <CardForm onSubmit={handleSubmit} />
      {transactionIds.length > 0 && (
        <TransactionList transactionIds={transactionIds} />
      )}
    </div>
  );
}
