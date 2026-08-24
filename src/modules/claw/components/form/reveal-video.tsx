'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

interface RevealVideoProps {
  play: boolean;
  onEnded: () => void;
}

export function RevealVideo(props: RevealVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.currentTime = 0;
    videoRef.current.play();
  }, [props.play]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 hidden h-dvh w-dvw items-center justify-center bg-black',
        props.play && 'flex',
      )}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        onEnded={props.onEnded}
        className="pointer-events-none size-full object-contain"
      >
        <source
          src="/claw/videos/reveal/web.mp4"
          type="video/mp4"
          media="(min-width: 768px)"
        />
        <source
          src="/claw/videos/reveal/mobile.mp4"
          type="video/mp4"
          media="(max-width: 767px)"
        />
      </video>
    </div>
  );
}
