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

  // Send details off to be processed
  for (const [key, value] of Object.entries(creditCardData)) {
    console.log(`${key}: ${value}`);
  }

  return transactionId;
};
