import { cn } from '@/lib/utils';

import type { Odd } from '../schemas/odds.schema';
import { OddType } from '../schemas/odds.schema';

export const oddColorMap: Record<OddType, string> = {
  'ultra-rare': cn('[--color-odd:var(--primary)]'),
  'rare': cn('[--color-odd:var(--color-purple-400)]'),
  'uncommon': cn('[--color-odd:var(--color-emerald-300)]'),
  'common': cn('[--color-odd:var(--color-blue-400)]'),
  'base': cn('[--color-odd:var(--muted-foreground)]'),
};

const createOdds = <T extends Odd[]>(
  arr: T & (OddType extends T[number]['type'] ? T : never),
) => arr;

export const odds = createOdds([
  {
    type: OddType['ultra-rare'],
    name: 'Ultra-Rare',
    colorClassName: oddColorMap[OddType['ultra-rare']],
  },
  {
    type: OddType.rare,
    name: 'Rare',
    colorClassName: oddColorMap[OddType.rare],
  },
  {
    type: OddType.uncommon,
    name: 'Uncommon',
    colorClassName: oddColorMap[OddType.uncommon],
  },
  {
    type: OddType.common,
    name: 'Common',
    colorClassName: oddColorMap[OddType.common],
  },
  {
    type: OddType.base,
    name: 'Base',
    colorClassName: oddColorMap[OddType.base],
  },
]);
