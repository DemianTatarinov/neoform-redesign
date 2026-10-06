import { Link } from "wouter";
import { triggerHaptic } from "@/utils/haptics";

const events = [
  {
    href: "/neolab/peka",
    tag: "PEKA",
    title: "Organizacja przestrzeni w kuchni i najnowsze rozwiązania.",
  },
  {
    href: "/neolab/materialy",
    tag: "MATERIAŁY",
    title: "Fornir, HPL, FENIX, ARPA i możliwości ich zastosowania.",
  },
  {
    href: "/neolab/architekci",
    tag: "ARCHITEKCI",
    title: "Wymiana doświadczeń i spotkania dla architektów.",
  },
] as const;

export default function NeoLabCards() {
  return (
    <div>
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">[ NAJBLIŻSZE WYDARZENIA ]</p>
      <div className="grid gap-4">
        {events.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => triggerHaptic()}
            className="group flex items-start justify-between gap-6 border border-white/10 p-6 transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.03] focus-visible:border-white/60 focus-visible:outline-none"
          >
            <div>
              <span className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F26522]" aria-hidden />
                NEO LAB / {item.tag}
              </span>
              <strong className="block text-sm font-medium leading-relaxed text-white">{item.title}</strong>
            </div>
            <span className="text-lg text-neutral-500 transition-colors group-hover:text-white" aria-hidden>
              ↗
            </span>
          </Link>
        ))}
      </div>
      <Link
        href="/neolab"
        onClick={() => triggerHaptic()}
        className="mt-6 inline-flex items-center border border-white/20 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-[#0d0d0d]"
      >
        [ ZOBACZ WSZYSTKIE WYDARZENIA ]
      </Link>
    </div>
  );
}
