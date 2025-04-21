import { NextRequest, NextResponse } from 'next/server';

import { mockDB } from '../../mockDB';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

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
