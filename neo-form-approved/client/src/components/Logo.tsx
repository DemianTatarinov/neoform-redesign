import { Link } from "wouter";

type LogoProps = {
  className?: string;
  linked?: boolean;
  href?: string;
  onClick?: () => void;
  /** "light" = white mark for dark backgrounds, "dark" = graphite mark for light backgrounds. */
  tone?: "light" | "dark";
};

const sources = {
  light: "/logo/logo-full.png",
  dark: "/logo/logo-full-dark.png",
} as const;

export default function Logo({
  className = "h-8 md:h-10",
  linked = true,
  href = "/",
  onClick,
  tone = "light",
}: LogoProps) {
  const mark = (
    <img
      src={sources[tone]}
      alt="NEO FORM"
      className={`${className} w-auto object-contain`.trim()}
    />
  );

  if (!linked) return mark;

  const classNameLink = "brand relative z-50 inline-flex shrink-0 items-center";

  if (href.startsWith("#") || href.startsWith("/#")) {
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
