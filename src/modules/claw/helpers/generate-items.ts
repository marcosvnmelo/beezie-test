import { genRandomNumber } from '@/helpers/generate-random-number';

import { itemSchema } from '../schemas/item';

export function generateItems(amount: number) {
  let oddTypeEnumIndex = 0;

  const REPEAT_COLOR_AMOUNT = 2;
  let colorRepeatCount = 0;

  function getOddType() {
    const oddTypes = itemSchema.shape.oddType.options;
    const oddType = oddTypes[oddTypeEnumIndex];

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

  return Array.from({ length: amount }).map((_, i) => {
    const randomYear = genRandomNumber(2000, 2025);
    const randomNumber = genRandomNumber(1, 200);
    const randomCondition = genRandomNumber(1, 10);

    const randomFMV = genRandomNumber(22, 1000);

    const oddType = getOddType();

    return itemSchema.parse({
      id: `${i}`,
      name: `${randomYear} Legendary Collection Mewtwo #${randomNumber} CGC ${randomCondition}`,
      fmv: randomFMV,
      image: 'http://localhost:3000/mock/top-item.webp',
      oddType,
    });
  });
}
