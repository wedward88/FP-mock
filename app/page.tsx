'use client';
import { useEffect, useState } from 'react';

import CardForm from './payment-card/Form';
import TransactionList from './transactions/List';
import { CardData, Transaction } from './types/types';
import { encryptData } from './utils';

type TransactionIds = Transaction[];

export default function Home() {
  const [transactionIds, setTransactionIds] =
    useState<TransactionIds>([]);

  useEffect(() => {
    // Fetch any existing transactions
    // Only runs once on initial render
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
    formData: CardData,
    clearFormCallback: () => void
  ) => {
    // Prevent page refresh on submit
    // Encrypt client-side data, send to server
    // Update transaction list with new transaction
    event.preventDefault();
    // Encrypt the form data
    // This is unnecessary when using HTTPS, but thought
    // it would be fun to implement for this exercise
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

    if (!response.ok) {
      throw new Error('Failed to create transaction.');
    }

    const result = await response.json();
    setTransactionIds([...transactionIds, result]);
    clearFormCallback();
  };

  return (
    <div className="flex justify-around m-10 ">
      <CardForm submitForm={handleSubmit} />
      {transactionIds.length > 0 && (
        <TransactionList transactionIds={transactionIds} />
      )}
    </div>
  );
}
