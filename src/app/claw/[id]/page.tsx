import type { Metadata } from 'next';
import type { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import { cache } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { client, orpc } from '@/lib/orpc';
import { ClawCard } from '@/modules/claw/components/cards/claw-card/claw-card';
import { IdleVideoCard } from '@/modules/claw/components/cards/idle-video-card';
import { RecentPullsCard } from '@/modules/claw/components/cards/recent-pulls-card';
import { TopItemsCard } from '@/modules/claw/components/cards/top-items-card/top-items-card';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const claw = await getCachedClaw(id);

  return {
    title: claw.name,
    icons: [
      {
        url: '/claw/videos/reveal/web.mp4',
        type: 'video/mp4',
        rel: 'preload',
        media: '(min-width: 768px)',
        as: 'video',
      } as Icon,
      {
        url: '/claw/videos/reveal/mobile.mp4',
        type: 'video/mp4',
        rel: 'preload',
        media: '(max-width: 767px)',
        as: 'video',
      } as Icon,
    ],
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  const claw = await getCachedClaw(id);

  await Promise.all([
    queryClient.setQueryData(
      orpc.claw.findById.queryKey({ input: { id } }),
      claw,
    ),
    queryClient.query(orpc.payment.list.queryOptions()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex justify-center pb-20 md:pb-6">
        <div className="grid grid-rows-[1fr_1fr_auto_auto] gap-4 px-4 py-2 md:max-w-7xl md:grid-cols-2 md:grid-rows-none">
          <IdleVideoCard claw={claw} />

          <ClawCard claw={claw} />

          <TopItemsCard />

          <RecentPullsCard />
        </div>
      </main>
    </HydrationBoundary>
  );
}

const getCachedClaw = cache(async (id: string) => {
  const claw = await client.claw.findById({ id });
  return claw;
});
