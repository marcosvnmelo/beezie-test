import { genRandomNumber } from './generate-random-number';

export async function artificialDelay(minMs: number = 100, maxMs: number = minMs + 1000) {
  const ms = genRandomNumber(minMs, maxMs);
  await new Promise((resolve) => setTimeout(resolve, ms));
}
