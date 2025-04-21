'use client';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import {
  FaCcDiscover,
  FaCcMastercard,
  FaCcVisa,
} from 'react-icons/fa';
import { FaCcAmex } from 'react-icons/fa6';

import { Transaction } from '@/app/types/types';
import { decryptData, getCardType } from '@/app/utils';

interface TransactionPageProps {
  params: Promise<{ id: string }>;
}

type CardType =
  | 'Visa'
  | 'MasterCard'
  | 'American Express'
  | 'Discover';

const CARD_TYPE_ICONS: Record<CardType, IconType> = {
  Visa: FaCcVisa,
  MasterCard: FaCcMastercard,
  'American Express': FaCcAmex,
  Discover: FaCcDiscover,
};

const TransactionPage = ({ params }: TransactionPageProps) => {
  const { id } = use(params);

  const [transaction, setTransaction] = useState<Transaction | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Determine card issuer via regex
  const cardType = transaction
    ? getCardType(transaction.number)
    : 'Unknown';

  const CardIcon =
    cardType !== 'Unknown'
      ? CARD_TYPE_ICONS[cardType as CardType]
      : null;

  useEffect(() => {
    // Fetch transaction data, decrypt it
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
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch transaction data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col items-center my-10 space-y-5">
      {loading ? (
        <span className="loading loading-spinner loading-xl"></span>
      ) : (
        <div>
          Transaction ID: <span className="font-bold">{id}</span>
          <div className="relative flex flex-col space-y-5 mt-5 p-5 border-1 border-gray-300 rounded-xl">
            {transaction ? (
              <>
                <p>
                  <span className="text-gray-500">Card Number:</span>{' '}
                  {transaction.number}
                </p>
                <p>
                  <span className="text-gray-500">Name:</span>{' '}
                  {transaction.name}
                </p>
                <p>
                  <span className="text-gray-500">
                    Expiration Date:
                  </span>{' '}
                  {transaction.expirMonth}/{transaction.expirYear}
                </p>
                <p>
                  <span className="text-gray-500">CVV:</span>{' '}
                  {transaction.cvv}
                </p>
                <div>
                  <p>
                    <span className="text-gray-500">Amount:</span> $
                    {transaction.amount}
                  </p>
                  {CardIcon && (
                    <CardIcon className="absolute bottom-5 right-5 text-8xl" />
                  )}
                </div>
              </>
            ) : (
              <p>No transaction found.</p>
            )}
          </div>
        </div>
      )}
      <Link className="btn" href="/">
        Back
      </Link>
    </div>
  );
};

export default TransactionPage;
