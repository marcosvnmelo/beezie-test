import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WalletIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/helpers/format-currency';
import { client } from '@/lib/orpc';
import { cn } from '@/lib/utils';

import { HeaderNavigation } from './header-navigation';

export function Header() {
  return (
    <header
      className={cn(
        'grid h-16 items-center justify-between px-4 md:h-20 md:px-12.5',
        'grid-cols-[1fr_max-content_1fr]',
        '*:last:justify-end',
      )}
    >
      <Logo />

      <HeaderNavigation />

      <Suspense fallback={<UserAreaSkeleton />}>
        <UserArea />
      </Suspense>
    </header>
  );
}

function Logo() {
  return (
    <Link href="/claw">
      <Image
        src="/logo-mobile.svg"
        alt="Beezie Logo"
        className="md:hidden"
        width={22}
        height={32}
        priority
        unoptimized
      />
      <Image
        src="/logo.svg"
        alt="Beezie Logo"
        className="hidden md:block"
        width={94}
        height={40}
        priority
        unoptimized
      />
    </Link>
  );
}

async function UserArea() {
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

function UserAreaSkeleton() {
  return (
    <div className="hidden items-center gap-4 md:flex">
      <Skeleton className="h-8 w-23 rounded-md" />

      <Skeleton className="size-10 rounded-full" />
    </div>
  );
}
