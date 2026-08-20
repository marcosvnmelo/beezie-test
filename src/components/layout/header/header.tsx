import Image from 'next/image';
import { WalletIcon } from 'lucide-react';

import { formatBalance } from '@/helpers/format-balance';

import { HeaderNavigation } from './header-navigation';

export function Header() {
  return (
    <header className="flex h-20 items-center justify-between px-12.5">
      <Logo />

      <HeaderNavigation />

      <UserArea />
    </header>
  );
}

function Logo() {
  return (
    <a href="/claw">
      <Image
        src="/logo.svg"
        alt="Beezie Logo"
        width={94}
        height={40}
        priority
        unoptimized
      />
    </a>
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
    <div className="flex items-center gap-4">
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
