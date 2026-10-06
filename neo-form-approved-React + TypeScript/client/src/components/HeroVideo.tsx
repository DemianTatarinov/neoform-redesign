import type { ReactNode } from "react";

type HeroVideoProps = {
  children?: ReactNode;
};

export default function HeroVideo({ children }: HeroVideoProps) {
  return (
    <div className="relative w-full aspect-[4/5] overflow-hidden bg-black">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero-main.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
      {children}
    </div>
  );
}
