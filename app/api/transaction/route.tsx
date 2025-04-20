import { NextRequest, NextResponse } from 'next/server';

import { mockDB } from '../mockDB';

export async function GET(request: NextRequest) {
  const body = await request.json();
  if (!body.id) {
    return NextResponse.error();
  }

  const transaction = mockDB[body.id] ?? null;

  if (!transaction) {
    return NextResponse.error();
  }

  return NextResponse.json(transaction);
}
