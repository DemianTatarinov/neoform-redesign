import { useCallback, useEffect, useRef, useState } from "react";
import { triggerHaptic } from "@/utils/haptics";

const SLIDES = ["/videos/hero-main.mp4", "/videos/hero-1.mp4", "/videos/hero-2.mp4"] as const;

export default function HeroVideo() {
  const [index, setIndex] = useState(0);
  const videosRef = useRef<Array<HTMLVideoElement | null>>([]);
  const startXRef = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    videosRef.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [index]);

  const finishGesture = (clientX: number) => {
    if (startXRef.current === null) return;
    const delta = clientX - startXRef.current;
    startXRef.current = null;
    if (Math.abs(delta) < 50) return;
    triggerHaptic();
    goTo(index + (delta < 0 ? 1 : -1));
  };

  return (
    <div
      className="hero__video-carousel pointer-events-auto absolute inset-0 z-0 overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero video slider"
      onTouchStart={(event) => {
        startXRef.current = event.changedTouches[0].clientX;
      }}
      onTouchEnd={(event) => finishGesture(event.changedTouches[0].clientX)}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") return;
        startXRef.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (event.pointerType === "touch") return;
        finishGesture(event.clientX);
      }}
    >
      {SLIDES.map((src, i) => (
        <video
          key={src}
          ref={(node) => {
            videosRef.current[i] = node;
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0"}`}
          src={src}
          autoPlay={i === index}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden={i !== index}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/35" />
      <div className="hero-video-dots pointer-events-auto" role="tablist" aria-label="Wybór wideo">
        {SLIDES.map((src, i) => (
          <button
            key={src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Wideo ${i + 1}`}
            className={i === index ? "is-active" : ""}
            onClick={() => {
              triggerHaptic();
              goTo(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}
