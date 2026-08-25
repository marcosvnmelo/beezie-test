import Image from 'next/image';

import type { Claw } from '@/modules/claw/schemas/claws.schema';

interface IdleVideoCardProps {
  claw: Claw;
}

export function IdleVideoCard(props: IdleVideoCardProps) {
  return (
    <div className="pointer-events-none relative">
      <Image
        src={props.claw.medias.idleVideo.fallbackImageUrl}
        alt=""
        loading="eager"
        aria-hidden="true"
        width={50}
        height={50}
        className="absolute z-1 size-full rounded-xl object-cover opacity-75 mix-blend-screen blur-[50px] brightness-120 saturate-180 motion-safe:animate-neon-pulse"
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={props.claw.medias.idleVideo.fallbackImageUrl}
        aria-hidden="true"
        className="relative z-2 size-full rounded-xl object-cover max-md:aspect-square"
      >
        <source src={props.claw.medias.idleVideo.url} type="video/mp4" />
      </video>
    </div>
  );
}
