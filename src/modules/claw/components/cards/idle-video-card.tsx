import type { Claw } from '@/modules/claw/schemas/claws';

interface IdleVideoCardProps {
  claw: Claw;
}

export function IdleVideoCard(props: IdleVideoCardProps) {
  return (
    <div className="aspect-square overflow-hidden rounded-[20]">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={props.claw.medias.idleVideo.fallbackImageUrl}
        aria-hidden="true"
        className="aspect-square size-full object-cover"
      >
        <source src={props.claw.medias.idleVideo.url} type="video/mp4" />
      </video>
    </div>
  );
}
