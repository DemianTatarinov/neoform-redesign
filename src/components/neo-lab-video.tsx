import { useEffect, useRef } from 'react';
import labClip from '@/assets/VIDEO/VIDEO1.mp4';

export function NeoLabVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Мгновенный старт воспроизведения
    const playVideo = () => {
      video.play().catch(() => {
        // браузерные политики автовоспроизведения
      });
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('loadeddata', playVideo, { once: true });
    }
  }, []);

  return (
    <div className="relative h-[calc(100svh-30px)] min-h-[500px] w-full overflow-hidden md:min-h-[630px]">
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        playsInline
        muted
        loop
        autoPlay
        preload="auto"
      >
        <source src={labClip} type="video/mp4" />
      </video>

      <div
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent sm:h-48"
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-20 mx-auto flex w-full max-w-7xl flex-col justify-end px-[max(1rem,env(safe-area-inset-left))] pb-12 pr-[max(1rem,env(safe-area-inset-right))] sm:px-8 sm:pb-20">
        <div className="relative z-20">
          <div className="hero-kicker text-[color:var(--brand)]">
            NEO LAB
          </div>
          <h1
            id="neo-lab-title"
            className="max-w-3xl text-3xl font-light uppercase leading-tight tracking-tight text-white md:text-6xl"
          >
            WIEDZA, KTÓRA POWSTAJE W PRAKTYCE
          </h1>
          <span className="accent-line" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}