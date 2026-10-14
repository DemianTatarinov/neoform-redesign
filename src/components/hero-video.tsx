import { useEffect, useRef } from 'react';
import heroVideo from '@/assets/VIDEO/VIDEO2.mp4';
import heroPoster from '@/assets/hero-video-poster.jpg';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 1. Принудительно глушим звук на уровне DOM (обход блокировки Autoplay)
    video.muted = true;
    video.defaultMuted = true;

    // 2. Функция гарантированного мгновенного запуска
    const startPlayback = () => {
      const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (preference.matches) {
        video.pause();
        return;
      }

      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Если браузер все-таки заблокировал, пробуем запустить еще раз по событию canplay
          video.addEventListener('canplay', () => void video.play(), { once: true });
        });
      }
    };

    // Если видео уже в кэше/памяти — запускаем сразу, иначе ждем минимальной готовности
    if (video.readyState >= 2) {
      startPlayback();
    } else {
      video.addEventListener('loadeddata', startPlayback, { once: true });
    }
  }, []);

  return (
    <div className="h-full w-full bg-neutral-950">
      <video
        ref={videoRef}
        src={heroVideo}
        poster={heroPoster}
        className="h-full w-full object-cover"
        playsInline
        muted
        loop
        autoPlay
        preload="auto"
        fetchPriority="high"
      />
    </div>
  );
}
