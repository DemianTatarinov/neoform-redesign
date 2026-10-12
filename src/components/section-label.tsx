export const HOME_SECTION_TOTAL = 13;

import type { ReactNode } from 'react';

export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{children}</span>
      <span className="section-number">
        {number} / {HOME_SECTION_TOTAL}
      </span>
    </div>
  );
}
