'use client';
import { useEffect, useState } from 'react';

import CardForm from './payment-card/Form';
import TransactionList from './transactions/List';
import { Transaction } from './types/types';
import { encryptData } from './utils';

type TransactionIds = Transaction[];

export default function Home() {
  const [transactionIds, setTransactionIds] =
    useState<TransactionIds>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/transactions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        setTransactionIds(result);
      } catch (error) {
        console.error('Failed to fetch transaction data:', error);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async (
    event: React.FormEvent,
    formData: any,
    callBack: () => void
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
    callBack();
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
