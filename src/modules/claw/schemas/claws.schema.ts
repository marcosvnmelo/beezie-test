import { z } from 'zod';

import { oddsDataSchema } from './odds.schema';

export const clawSchema = z.object({
  id: z.string(),
  name: z.string(),
  values: z.object({
    price: z.number(),
    points: z.number(),
    swapRatePercentage: z.number(),
  }),
  medias: z.object({
    idleVideo: z.object({
      url: z.string(),
      fallbackImageUrl: z.string(),
    }),
    boxIcon: z.object({
      url: z.string(),
    }),
  }),
  oddsData: oddsDataSchema,
  validations: z.object({
    maxQuantity: z.number(),
  }),
});

export type Claw = z.infer<typeof clawSchema>;
