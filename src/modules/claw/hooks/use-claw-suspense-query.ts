import { use } from 'react';

import { artificialDelay } from '@/helpers/artificial-delay';

import type { Claw } from '../schemas/claws.schema';
import { claws } from '../constants/claws';

const clawPromise = getClawData();

export function useClawSuspenseQuery() {
  // TODO: Get claw data from server
  const claw = use(clawPromise);

  return { claw };
}

async function getClawData(): Promise<Claw> {
  await artificialDelay();

  return claws[0]!;
}
