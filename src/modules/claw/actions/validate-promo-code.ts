'use server';

import { artificialDelay } from '@/helpers/artificial-delay';

const EXPIRED_PROMO_CODE = 'promo9';
const VALID_PROMO_CODE = 'promo10';

type ValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      message: string;
    };

export default async function validatePromoCodeAction(
  promotionCode: string,
): Promise<ValidationResult> {
  try {
    const isPromoCodeEmpty = promotionCode.length === 0;
    const isPromoCodeExpired = promotionCode === EXPIRED_PROMO_CODE;
    const isPromoCodeInvalid = promotionCode !== VALID_PROMO_CODE;

    await artificialDelay();

    if (isPromoCodeEmpty) {
      return { valid: false, message: 'Code is required' };
    }

    if (isPromoCodeExpired) {
      return { valid: false, message: 'Code has expired' };
    }

    if (isPromoCodeInvalid) {
      return { valid: false, message: 'Invalid code' };
    }

    return { valid: true };
  } catch {
    return { valid: false, message: 'Something went wrong' };
  }
}
