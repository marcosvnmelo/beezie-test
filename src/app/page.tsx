import { redirect } from 'next/navigation';

import { client } from '@/lib/orpc';

export default async function Page() {
  const claw = await client.claw.findDefault();

  redirect(`/claw/${claw.id}`);
}
