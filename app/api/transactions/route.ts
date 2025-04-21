import { NextRequest, NextResponse } from 'next/server';

import { mockDB } from '../mockDB';

export async function GET(request: NextRequest) {
  const allTransactionIds = Object.keys(mockDB).map((id) => ({ id }));
  return NextResponse.json(allTransactionIds);
}
