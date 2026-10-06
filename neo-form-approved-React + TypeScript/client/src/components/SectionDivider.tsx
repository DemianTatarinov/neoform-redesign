type SectionDividerProps = {
  index: string;
  label: string;
  /** Border tone at the transition between section backgrounds */
  tone?: "light" | "dark";
};

export default function SectionDivider({ index, label, tone = "light" }: SectionDividerProps) {
  return (
    <div
      className={`section-divider border-t ${
        tone === "dark"
          ? "section-divider--on-dark bg-neutral-950 border-white/10"
          : "section-divider--on-light bg-transparent border-neutral-200/80"
      }`}
      aria-hidden
    >
      <div className="shell section-divider__inner">
        <span className="inline-block h-[2px] w-12 shrink-0 bg-[#F26522]" />
        <span className="section-divider__label font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400">
          [ {index} // {label} ]
        </span>
        <span className="section-divider__line" />
      </div>
    </div>
  );
}
