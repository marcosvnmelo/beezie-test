import Image from 'next/image';

import type { Claw } from '@/modules/claw/schemas/claws';

interface IdleVideoCardProps {
  claw: Claw;
}

export function IdleVideoCard(props: IdleVideoCardProps) {
  return (
    <div className="relative aspect-square">
      <Image
        src={props.claw.medias.idleVideo.fallbackImageUrl}
        alt=""
        aria-hidden="true"
        width={50}
        height={50}
        className="absolute z-1 size-full rounded-[calc(var(--radius)*2)] object-cover opacity-75 mix-blend-screen blur-[50px] brightness-120 saturate-180 motion-safe:animate-neon-pulse"
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={props.claw.medias.idleVideo.fallbackImageUrl}
        aria-hidden="true"
        className="relative z-2 aspect-square size-full rounded-[calc(var(--radius)*2)] object-cover"
      >
        <source src={props.claw.medias.idleVideo.url} type="video/mp4" />
      </video>
    </div>
  );
}
