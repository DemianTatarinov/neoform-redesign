import { useCallback, useRef, useState } from "react";

export default function HeroVideo() {
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [swiped, setSwiped] = useState(false);

  const handleFirstEnded = useCallback(() => {
    setSwiped(true);
    const second = video2Ref.current;
    if (!second) return;
    second.loop = true;
    void second.play().catch(() => undefined);
  }, []);

  return (
    <div className="hero__video-carousel hero__video-carousel--auto pointer-events-none" aria-hidden>
      <video
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out ${swiped ? "-translate-x-full" : "translate-x-0"}`}
        src="/videos/hero-1.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleFirstEnded}
      />
      <video
        ref={video2Ref}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out ${swiped ? "translate-x-0" : "translate-x-full"}`}
        src="/videos/hero-2.mp4"
        muted
        playsInline
        preload="auto"
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/55" />
    </div>
  );
}
