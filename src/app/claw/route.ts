import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { client } from '@/lib/orpc';

export async function GET(request: NextRequest) {
  const claw = await client.claw.findDefault();

  return NextResponse.redirect(new URL(`/claw/${claw.id}`, request.url));
}
