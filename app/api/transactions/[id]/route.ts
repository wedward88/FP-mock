import { NextRequest, NextResponse } from 'next/server';

import { mockDB } from '../../mockDB';

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: Context) {
  const { id } = await context.params;
  console.log('Incoming request:', request.method, request.url);

  if (!id) {
    return NextResponse.json(
      { error: 'Transaction ID is missing' },
      { status: 400 }
    );
  }

  const transaction = mockDB[id];

  if (!transaction) {
    return NextResponse.json(
      { error: 'Transaction not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(transaction);
}
