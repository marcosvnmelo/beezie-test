import { os } from '@orpc/server';
import { z } from 'zod';

import { claws } from '@/modules/claw/constants/claws';

const findDefault = os.handler(async () => {
  return claws[0]!;
});

const findById = os
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const claw = claws.find((c) => c.id === input.id);

    if (!claw) {
      throw new Error('Claw not found');
    }

    return claw;
  });

export const clawRouter = {
  findDefault,
  findById,
};
