import { NextRequest, NextResponse } from 'next/server';

import { mockDB } from '../mockDB';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const transactionId = crypto.randomUUID();

  mockDB[transactionId] = body;

  return NextResponse.json({ id: transactionId });
}
