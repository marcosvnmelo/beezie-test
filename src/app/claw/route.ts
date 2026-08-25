import type { NextRequest } from 'next/server';
import { cacheLife, cacheTag } from 'next/cache';
import { NextResponse } from 'next/server';

import { client } from '@/lib/orpc';

export async function GET(request: NextRequest) {
  const claw = await getCachedDefaultClaw();

  return NextResponse.redirect(new URL(`/claw/${claw.id}`, request.url));
}

async function getCachedDefaultClaw() {
  'use cache';
  cacheLife('days');
  cacheTag('default-claw');

  const claw = await client.claw.findDefault();

  return claw;
}
