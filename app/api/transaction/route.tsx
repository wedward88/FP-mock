import { NextRequest, NextResponse } from 'next/server';

import { mockDB } from '../mockDB';

export async function GET(request: NextRequest) {
  const body = await request.json();
  const transcation = mockDB[body.id];

  return NextResponse.json(transcation);
}
