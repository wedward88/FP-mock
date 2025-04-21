import { NextRequest, NextResponse } from 'next/server';

import { mockDB } from '../mockDB';

export async function GET(request: NextRequest) {
  console.log('Incoming request:', request.method, request.url);

  const allTransactionIds = Object.keys(mockDB).map((id) => ({ id }));
  return NextResponse.json(allTransactionIds);
}
