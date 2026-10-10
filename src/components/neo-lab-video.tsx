import { useEffect, useRef } from 'react';
import clip from '@/assets/neo-lab-mobile.mp4.asset.json';
import clipWebm from '@/assets/neo-lab-mobile.webm.asset.json';
import poster from '@/assets/neo-lab-poster.jpg.asset.json';

export function NeoLabVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (preference.matches) video.pause();
      else void video.play().catch(() => {});
    };
    const respectPreference = () => { if (preference.matches) video.pause(); };
    sync();
    preference.addEventListener('change', sync);
    video.addEventListener('play', respectPreference);
    return () => {
      preference.removeEventListener('change', sync);
      video.removeEventListener('play', respectPreference);
    };
  }, []);

  return (
    <div className="neo-lab-video" aria-hidden="true">
      <video ref={videoRef} className="neo-lab-video-media" poster={poster.url} autoPlay loop muted playsInline preload="auto">
        <source src={clipWebm.url} type="video/webm" />
        <source src={clip.url} type="video/mp4" />
      </video>
      <div className="neo-lab-video-shade" />
    </div>
  );
}
