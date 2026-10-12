import { useRef } from 'react';
import { NeoLab } from '@/components/neo-lab';
import { Inspiracje } from '@/components/inspiracje';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useHomeHashScroll } from '@/lib/use-home-hash-scroll';

export function NeoLabExperience() {
  const pageRef = useRef<HTMLElement>(null);
  useScrollReveal(pageRef);
  useHomeHashScroll();
  return <main ref={pageRef} className="neo-lab-page" id="neo-lab-top">
    <NeoLab />
    <Inspiracje />
  </main>;
}