import { z } from 'zod';

export const oddTypeSchema = z.enum(['ultra-rare', 'rare', 'uncommon', 'common', 'base']);
export const OddType = oddTypeSchema.enum;
export type OddType = z.infer<typeof oddTypeSchema>;

export const oddSchema = z.object({
  type: oddTypeSchema,
  name: z.string(),
  colorClassName: z.string(),
});

export type Odd = z.infer<typeof oddSchema>;

export const oddDataSchema = z.object({
  percent: z.number(),
  value: z.number().or(z.tuple([z.number(), z.number()])),
});
export type OddData = z.infer<typeof oddDataSchema>;

export const oddsDataSchema = z.object({
  averageValue: z.number(),
  odds: z.record(oddTypeSchema, oddDataSchema),
});
export type OddsData = z.infer<typeof oddsDataSchema>;
