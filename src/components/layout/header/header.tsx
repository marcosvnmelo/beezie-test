import Image from 'next/image';
import Link from 'next/link';
import { WalletIcon } from 'lucide-react';

import { formatCurrency } from '@/helpers/format-currency';
import { cn } from '@/lib/utils';

import { HeaderNavigation } from './header-navigation';

export function Header() {
  return (
    <header
      className={cn(
        'grid h-16 items-center justify-between px-4 md:h-20 md:px-12.5',
        'grid-cols-[minmax(auto,1fr)_auto_minmax(auto,1fr)]',
        '*:last:justify-end',
      )}
    >
      <Logo />

      <HeaderNavigation />

      <UserArea />
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

function UserArea() {
  // TODO: Fetch user data from API
  const userData = {
    balance: 190,
    image: 'http://localhost:3000/mock/avatar.jpg',
  };

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
