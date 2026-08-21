import { cn } from '@/lib/utils';

import type { Odd, OddType } from '../schemas/odds';

const createOdds = <T extends Odd[]>(
  arr: T & (OddType extends T[number]['type'] ? T : never),
) => arr;

export const odds = createOdds([
  {
    type: 'ultra-rare',
    name: 'Ultra-Rare',
    colorClassName: cn('[--color-odd:var(--primary)]'),
  },
  {
    type: 'rare',
    name: 'Rare',
    colorClassName: cn('[--color-odd:var(--color-purple-400)]'),
  },
  {
    type: 'uncommon',
    name: 'Uncommon',
    colorClassName: cn('[--color-odd:var(--color-emerald-300)]'),
  },
  {
    type: 'common',
    name: 'Common',
    colorClassName: cn('[--color-odd:var(--color-blue-400)]'),
  },
  {
    type: 'base',
    name: 'Base',
    colorClassName: cn('[--color-odd:var(--muted-foreground)]'),
  },
]);
