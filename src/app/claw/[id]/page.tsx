import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { orpc } from '@/lib/orpc';
import { ClawCard } from '@/modules/claw/components/cards/claw-card/claw-card';
import { IdleVideoCard } from '@/modules/claw/components/cards/idle-video-card';
import { RecentPullsCard } from '@/modules/claw/components/cards/recent-pulls-card';
import { TopItemsCard } from '@/modules/claw/components/cards/top-items-card/top-items-card';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  const [claw] = await Promise.all([
    queryClient.query(orpc.claw.findById.queryOptions({ input: { id } })),
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
