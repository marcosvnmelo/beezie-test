import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { HeaderNavigation } from './header-navigation';
import { UserArea, UserAreaSkeleton } from './use-area';

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
