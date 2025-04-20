'use client';
import { use, useEffect, useState } from 'react';

import { Transaction } from '@/app/types/types';
import { decryptData } from '@/app/utils';

interface TransactionPageProps {
  params: Promise<{ id: string }>;
}

const TransactionPage = ({ params }: TransactionPageProps) => {
  const { id } = use(params);

  const [transaction, setTransaction] = useState<Transaction | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/transactions/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();

        const decryptedData: Transaction = decryptData(
          result,
          process.env.NEXT_PUBLIC_ENCRYPTION_SECRET!
        );

        setTransaction(decryptedData);
      } catch (error) {
        console.error('Failed to fetch transaction data:', error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <div>
      Transaction ID: {id}
      {transaction && (
        <div>
          <p>Card Number: {transaction.number}</p>
          <p>Name: {transaction.name}</p>
          <p>Expiry Month: {transaction.expirMonth}</p>
          <p>Expiry Year: {transaction.expirYear}</p>
          <p>CVV: {transaction.cvv}</p>
          <p>Amount: {transaction.amount}</p>
          <a className="btn" href="/">
            Back
          </a>
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
