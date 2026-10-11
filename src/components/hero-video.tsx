import { useEffect, useRef } from 'react';
import heroVideo from '@/assets/VIDEO/VIDEO2.mp4';
import interior from '@/assets/neo-interior.jpg';

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
    <video
      ref={videoRef}
      src={heroVideo}
      className="w-full h-full object-cover"
      playsInline
      muted
      loop
      autoPlay
      preload="auto"
      poster={interior}
    />
  );
}