import Image from 'next/image';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { SparkleIcon } from './icons/sparkle-icon';

interface MarketplaceNavigationItem {
  name: string;
  href: string;
  image: { href: string; alt: string };
}

const marketplaceNavigationItems: MarketplaceNavigationItem[] = [
  {
    name: 'Pokemon',
    href: '#',
    image: { href: '/header/pokemon.jpg', alt: 'Pokemon Cards' },
  },
  {
    name: 'Sealed Products',
    href: '#',
    image: { href: '/header/sealed-products.jpg', alt: 'Sealed Products' },
  },
  {
    name: 'One Piece',
    href: '#',
    image: { href: '/header/onepiece-banner.jpg', alt: 'One Piece Cards' },
  },
  {
    name: 'View all',
    href: '#',
    image: { href: '/header/all.jpg', alt: 'Diverse Cards' },
  },
];

export function HeaderNavigation() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Marketplace</NavigationMenuTrigger>
          <NavigationMenuContent className="space-y-2.5">
            <h2 className="text-sm font-medium text-[#b4b4b4]">
              Trending Categories
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {marketplaceNavigationItems.map((item) => (
                <Link
                  key={item.name}
                  className="relative isolate aspect-2/1 h-25 overflow-hidden rounded-lg bg-transparent px-2.5"
                  href={item.href}
                >
                  <span className="text-xs font-semibold whitespace-nowrap text-black">
                    {item.name}
                  </span>
                  <Image
                    src={item.image.href}
                    alt={item.image.alt}
                    width={200}
                    height={100}
                    className="absolute inset-0 -z-1 object-cover"
                  />
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuLinkItem href="/claw">
          <SparkleIcon />
          <span className="bg-linear-to-b from-[#FFB000] from-0% via-[#FFCA20] via-50% to-[#FFE082] to-100% bg-clip-text text-transparent">
            Gradient Text
          </span>
        </NavigationMenuLinkItem>
        <NavigationMenuLinkItem href="#">Leaderboard</NavigationMenuLinkItem>
        <NavigationMenuLinkItem href="#">Resources</NavigationMenuLinkItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>More</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="#">Blog</NavigationMenuLink>
            <NavigationMenuLink href="#">Activity</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface NavigationMenuLinkItemProps extends React.PropsWithChildren {
  href: string;
}

function NavigationMenuLinkItem(props: NavigationMenuLinkItemProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        className={navigationMenuTriggerStyle()}
        render={<Link href={props.href}>{props.children}</Link>}
      />
    </NavigationMenuItem>
  );
}
