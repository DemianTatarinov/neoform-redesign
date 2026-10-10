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
    <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted
        loop
        autoPlay
        preload="auto"
      >
        <source src={labClip} type="video/mp4" />
      </video>

      {/* Оформленный текст поверх видео */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-16 z-10">
        <div className="hero-kicker">
          NEO LAB
        </div>
        <h1 className="text-3xl md:text-6xl font-light tracking-tight text-white max-w-3xl uppercase leading-tight">
          WIEDZA, KTÓRA POWSTAJE W PRAKTYCE
        </h1>
      </div>
    </div>
  );
}