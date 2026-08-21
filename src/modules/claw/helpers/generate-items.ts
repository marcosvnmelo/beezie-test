import { genRandomNumber } from '@/helpers/generate-random-number';

import type { Item } from '../schemas/item';
import { itemSchema } from '../schemas/item';

interface GenerateItemsOptions {
  amount: number;
  nameGenerator: (values: {
    randomYear: number;
    randomNumber: number;
    randomCondition: number;
  }) => string;
  imageUrl: string;
}

export function generateItems(options: GenerateItemsOptions) {
  let oddTypeEnumIndex = 0;

  const REPEAT_COLOR_AMOUNT = 2;
  let colorRepeatCount = 0;

  function getOddType() {
    const oddTypes = itemSchema.shape.oddType.options;
    const oddType = oddTypes[oddTypeEnumIndex];

    if (!oddType) throw new Error('Odd type not found');

    colorRepeatCount++;

    if (colorRepeatCount >= REPEAT_COLOR_AMOUNT) {
      if (oddTypeEnumIndex + 1 === oddTypes.length) {
        oddTypeEnumIndex = 0;
      } else {
        oddTypeEnumIndex++;
      }

      colorRepeatCount = 0;
    }

    return oddType;
  }

  return Array.from({ length: options.amount }).map((_, i) => {
    const randomYear = genRandomNumber(2000, 2025);
    const randomNumber = genRandomNumber(1, 200);
    const randomCondition = genRandomNumber(1, 10);

    const randomFMV = genRandomNumber(22, 1000);

    const oddType = getOddType();

    return itemSchema.parse({
      id: `${i}`,
      name: options.nameGenerator({
        randomYear,
        randomNumber,
        randomCondition,
      }),
      fmv: randomFMV,
      image: options.imageUrl,
      oddType,
      owner: { name: 'Lebnani' },
    } satisfies Item);
  });
}
