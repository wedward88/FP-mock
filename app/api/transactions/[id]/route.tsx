import { NextRequest, NextResponse } from 'next/server';

import { mockDB } from '../../mockDB';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return new NextResponse('Transaction not found', { status: 404 });
  }
  const transaction = mockDB[id];

  console.log(transaction);
  if (!transaction) {
    return new NextResponse('Transaction not found', { status: 404 });
  }

  return NextResponse.json(transaction);
}
