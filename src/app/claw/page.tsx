import { IdleVideoCard } from '@/modules/claw/components/cards/idle-video-card';
import { claws } from '@/modules/claw/constants/claws';
export default function ClawPage() {
  // TODO: Get claw from query params
  const claw = claws[0]!;

  return (
    <main className="flex justify-center">
      <div className="grid gap-4 px-4 py-2 md:max-w-7xl md:grid-cols-2">
        <IdleVideoCard claw={claw} />
      </div>
    </main>
  );
}
