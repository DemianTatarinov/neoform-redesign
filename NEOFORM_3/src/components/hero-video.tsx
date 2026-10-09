import { useEffect, useRef } from 'react';
import heroVideo from '@/assets/neo-user-hero.asset.json';
import heroWebm from '@/assets/neo-user-hero-webm.asset.json';
import interior from '@/assets/neo-interior.jpg';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePlayback = () => {
      if (preference.matches) video.pause();
      else void video.play().catch(() => { /* Poster remains available. */ });
    };
    updatePlayback();
    preference.addEventListener('change', updatePlayback);
    return () => preference.removeEventListener('change', updatePlayback);
  }, []);

  return <video ref={videoRef} className="hero-image" poster={interior} autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
    <source src={heroWebm.url} type="video/webm" />
    <source src={heroVideo.url} type="video/mp4" />
  </video>;
}