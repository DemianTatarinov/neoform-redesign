import { Link } from "wouter";

type LogoProps = {
  className?: string;
  linked?: boolean;
  href?: string;
  onClick?: () => void;
};

function LogoMark({ className = "h-11 sm:h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} w-auto object-contain`.trim()}
      role="img"
      aria-label="NEO FORM Meble na wymiar"
    >
      <path
        d="M14 62V12L52 62V12"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <rect x="74" y="12" width="44" height="6.5" fill="#F26522" />
      <rect x="74" y="32" width="38" height="6.5" fill="#F26522" />
      <path
        d="M77 42V59H118"
        stroke="#FFFFFF"
        strokeWidth="6.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <ellipse cx="158" cy="37" rx="24" ry="25" stroke="#FFFFFF" strokeWidth="6" />
      <text
        x="100"
        y="88"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="400"
        fontSize="21"
        letterSpacing="11"
      >
        FORM
      </text>
      <line x1="12" y1="99" x2="188" y2="99" stroke="#F26522" strokeWidth="2" />
      <text
        x="100"
        y="120"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="500"
        fontSize="11.5"
        letterSpacing="2.8"
      >
        MEBLE NA WYMIAR
      </text>
    </svg>
  );
}

export default function Logo({
  className = "h-11 sm:h-12",
  linked = true,
  href = "/",
  onClick,
}: LogoProps) {
  const mark = <LogoMark className={className} />;

  if (!linked) return mark;

  const classNameLink = "brand inline-flex shrink-0 items-center transition-opacity hover:opacity-90";

  if (href.startsWith("#")) {
    return (
      <a className={classNameLink} href={href} aria-label="Neo Form — strona główna" onClick={onClick}>
        {mark}
      </a>
    );
  }

  return (
    <Link className={classNameLink} href={href} onClick={onClick}>
      {mark}
    </Link>
  );
}
