import { NextRequest, NextResponse } from 'next/server';

import { CardData } from '@/app/types/types';
import { decryptData } from '@/app/utils';

import { mockDB } from '../mockDB';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const transactionId = mockCardTransaction(body);
  mockDB[transactionId] = body;

  return NextResponse.json({ id: transactionId });
}

const mockCardTransaction = (encryptedData: string) => {
  const transactionId = crypto.randomUUID();
  const creditCardData = decryptData<CardData>(
    encryptedData,
    process.env.NEXT_PUBLIC_ENCRYPTION_SECRET!
  );

  console.log('Card Number:', creditCardData.number);
  console.log('Name:', creditCardData.name);
  console.log('Expiry Month:', creditCardData.expirMonth);
  console.log('Expiry Year:', creditCardData.expirYear);
  console.log('CVV:', creditCardData.cvv);
  console.log('Amount:', creditCardData.amount);

  return transactionId;
};
