import { ClawCard } from '@/modules/claw/components/cards/claw-card/claw-card';
import { IdleVideoCard } from '@/modules/claw/components/cards/idle-video-card';
import { RecentPullsCard } from '@/modules/claw/components/cards/recent-pulls-card';
import { TopItemsCard } from '@/modules/claw/components/cards/top-items-card/top-items-card';
import { claws } from '@/modules/claw/constants/claws';

export default function ClawPage() {
  // TODO: Get claw from query params
  const claw = claws[0]!;

  return (
    <main className="flex justify-center pb-20 md:pb-6">
      <div className="grid gap-4 px-4 py-2 md:max-w-7xl md:grid-cols-2">
        <IdleVideoCard claw={claw} />

        <ClawCard claw={claw} />

        <TopItemsCard />

        <RecentPullsCard />
      </div>
    </main>
  );
}
