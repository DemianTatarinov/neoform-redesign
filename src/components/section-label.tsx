export const HOME_SECTION_TOTAL = 11;

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
      <span className="section-label-title">{children}</span>
      <span className="section-number">
        {number} / {HOME_SECTION_TOTAL}
      </span>
    </div>
  );
}
