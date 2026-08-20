import Image from 'next/image';
import Link from 'next/link';
import { WalletIcon } from 'lucide-react';

import { formatBalance } from '@/helpers/format-balance';

import { HeaderNavigation } from './header-navigation';

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between px-4 md:h-20 md:px-12.5">
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

  const formattedBalance = formatBalance(userData.balance);

  return (
    <div className="hidden items-center gap-4 md:flex">
      <div className="flex items-center gap-2.5 bg-[#1A1A1A] px-4 py-1.5">
        <WalletIcon className="size-4" />

        <span className="text-sm font-medium">#1A1A1A{formattedBalance}</span>
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
