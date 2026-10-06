import { ChevronRight } from "lucide-react";
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
    tag: "ARCHITECTURE",
    title: "Wymiana doświadczeń i spotkania dla architektów.",
  },
] as const;

const cardClass =
  "group relative isolate mb-2 block min-h-[92px] overflow-hidden border border-white/10 bg-neutral-900/60 px-[22px] py-5 pr-[52px] backdrop-blur-md transition-all duration-300 hover:border-[#F26522]/80 hover:shadow-[0_0_25px_rgba(242,101,34,0.35),inset_0_0_15px_rgba(242,101,34,0.1)] focus-visible:border-[#F26522]/80 focus-visible:outline-none active:border-[#F26522]/80";

export default function NeoLabEvents() {
  return (
    <div className="neo-lab__events">
      <h3>[ NAJBLIŻSZE WYDARZENIA ]</h3>
      {events.map((item) => (
        <Link
          href={item.href}
          className={cardClass}
          key={item.href}
          onClick={() => triggerHaptic()}
        >
          <small className="relative z-[2] mb-2 block text-[10px] tracking-[0.12em] text-[#F26522]">
            NEO LAB / {item.tag}
          </small>
          <strong className="relative z-[2] block text-sm font-medium leading-[1.45] text-white">
            {item.title}
          </strong>
          <ChevronRight
            size={18}
            className="absolute top-1/2 right-[22px] z-[2] -translate-y-1/2 text-[#F26522] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:drop-shadow-[0_0_8px_#F26522]"
          />
        </Link>
      ))}
      <Link
        href="/neolab"
        className="mt-6 inline-flex items-center justify-center border border-[#F26522]/40 px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-[#F26522] shadow-[0_0_15px_rgba(242,101,34,0.2)] transition-all duration-300 hover:bg-[#F26522] hover:text-white hover:shadow-[0_0_30px_rgba(242,101,34,0.6)]"
        onClick={() => triggerHaptic()}
      >
        [ ZOBACZ WSZYSTKIE WYDARZENIA ]
      </Link>
    </div>
  );
}
