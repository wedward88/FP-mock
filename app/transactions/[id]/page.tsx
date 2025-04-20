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
    <div className="flex flex-col items-center my-10 space-y-5">
      <div>
        Transaction ID: <span className="font-bold">{id}</span>
        <div className="flex flex-col space-y-5 mt-5 p-5 border-1 border-gray-300 rounded-xl">
          {transaction ? (
            <>
              <p>Card Number: {transaction.number}</p>
              <p>Name: {transaction.name}</p>
              <p>
                Expiration Date: {transaction.expirMonth}/
                {transaction.expirYear}
              </p>
              <p>CVV: {transaction.cvv}</p>
              <p>Amount: ${transaction.amount}</p>
            </>
          ) : (
            <p>No transaction found.</p>
          )}
        </div>
      </div>
      <a className="btn" href="/">
        Back
      </a>
    </div>
  );
};

export default TransactionPage;
