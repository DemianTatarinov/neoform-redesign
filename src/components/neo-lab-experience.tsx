import { useRef } from 'react';
import { NeoLab } from '@/components/neo-lab';
import { Inspiracje } from '@/components/inspiracje';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export function NeoLabExperience() {
  const pageRef = useRef<HTMLElement>(null);
  useScrollReveal(pageRef);
  return <main ref={pageRef} className="neo-lab-page" id="neo-lab-top">
    <NeoLab />
    <Inspiracje />
  </main>;
}