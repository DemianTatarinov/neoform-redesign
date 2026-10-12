import type { ReactNode } from 'react';

const kickerClassName =
  'flex items-center justify-between gap-4 border-b border-[color:var(--ink-border)] pb-4 font-mono text-[length:var(--type-small)] uppercase tracking-widest text-[color:var(--brand)]';

export function EditorialKicker({
  children,
  aside,
  className,
}: {
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className ? `${kickerClassName} ${className}` : kickerClassName}>
      <span>{children}</span>
      {aside ? <span className="shrink-0 whitespace-nowrap">{aside}</span> : null}
    </div>
  );
}
