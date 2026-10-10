import { useEffect, useRef } from 'react';
import heroVideo from '@/assets/VIDEO/VIDEO2.mp4';
import interior from '@/assets/neo-interior.jpg';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePlayback = () => {
      if (preference.matches) {
        video.pause();
      } else {
        void video.play().catch(() => {
          /* Poster remains visible */
        });
      }
    };

    updatePlayback();
    preference.addEventListener('change', updatePlayback);
    return () => preference.removeEventListener('change', updatePlayback);
  }, []);

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-cover"
      playsInline
      muted
      loop
      autoPlay
      poster={interior}
    >
      <source src={heroVideo} type="video/mp4" />
    </video>
  );
}