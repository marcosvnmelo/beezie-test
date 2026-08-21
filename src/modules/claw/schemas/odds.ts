import { z } from 'zod';

const oddTypeSchema = z.enum(['ultra-rare', 'rare', 'uncommon', 'common', 'base']);
export type OddType = z.infer<typeof oddTypeSchema>;

export const oddSchema = z.object({
  type: oddTypeSchema,
  name: z.string(),
  colorClassName: z.string(),
});

export type Odd = z.infer<typeof oddSchema>;

export const oddDataSchema = z.object({
  percent: z.number(),
  value: z.number().or(z.array(z.number())),
});
export type OddData = z.infer<typeof oddDataSchema>;

export const oddsDataSchema = z.object({
  averageValue: z.number(),
  odds: z.array(oddDataSchema.extend({ type: oddTypeSchema })),
});
export type OddsData = z.infer<typeof oddsDataSchema>;
