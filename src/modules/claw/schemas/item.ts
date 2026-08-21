import { z } from 'zod';

import { oddTypeSchema } from './odds';

export const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  fmv: z.number().describe('Fair Market Value'),
  image: z.string(),
  oddType: oddTypeSchema,
  owner: z.object({
    name: z.string(),
  }),
});

export type Item = z.infer<typeof itemSchema>;
