import { NextResponse, NextRequest } from 'next/server';
import { nanoid } from 'nanoid';

export async function GET(req: NextRequest) {
  return NextResponse.redirect(new URL(`/sketch/${nanoid()}`, req.url));
}
