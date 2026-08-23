import { use } from 'react';

import { artificialDelay } from '@/helpers/artificial-delay';

import { PaymentMethods } from '../schemas/claw-form.schema';

type WalletsQueryOutput = Record<
  PaymentMethods,
  {
    name: string;
    balance: number | null;
  }
>;

const walletsPromise = getWalletsData();

export function useWalletsSuspenseQuery() {
  // TODO: Get wallets data from server
  const wallets = use(walletsPromise);

  return {
    wallets,
  };
}

async function getWalletsData(): Promise<WalletsQueryOutput> {
  await artificialDelay();

  return {
    [PaymentMethods.BeezieWallet]: {
      name: 'Beezie wallet',
      balance: 2500,
    },
    [PaymentMethods.ExternalWallet]: {
      name: 'External wallet',
      balance: 50,
    },
    [PaymentMethods.Card]: {
      name: 'Credit / Debit',
      balance: null,
    },
  };
}
