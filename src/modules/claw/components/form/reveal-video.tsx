'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

interface RevealVideoProps {
  play: boolean;
  onEnded: () => void;
}

export default function RevealVideo({ play, onEnded }: RevealVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    function onEndedListener() {
      if (play) onEnded();
    }

    const videoElement = videoRef.current;

    videoElement.addEventListener('ended', onEndedListener);

    videoElement.currentTime = 0;
    videoElement.play();

    return () => {
      videoElement.removeEventListener('ended', onEndedListener);
    };
  }, [play, onEnded]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 hidden h-dvh w-dvw items-center justify-center bg-black',
        play && 'flex',
      )}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
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
