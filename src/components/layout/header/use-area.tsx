import Image from 'next/image';
import { connection } from 'next/server';
import { WalletIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/helpers/format-currency';
import { client } from '@/lib/orpc';

export async function UserArea() {
  await connection();
  const userData = await client.user.me();

  const formattedBalance = formatCurrency(userData.balance);

  return (
    <div className="hidden items-center gap-4 md:flex">
      <div className="flex items-center gap-2.5 rounded-md bg-muted px-4 py-1.5">
        <WalletIcon className="size-4" />

        <span className="text-sm font-medium">{formattedBalance}</span>
      </div>

      <Image
        src={userData.image}
        alt="User Avatar"
        width={40}
        height={40}
        className="size-10 rounded-full"
      />
    </div>
  );
}

export function UserAreaSkeleton() {
  return (
    <div className="hidden items-center gap-4 md:flex">
      <Skeleton className="h-8 w-23 rounded-md" />

      <Skeleton className="size-10 rounded-full" />
    </div>
  );
}
