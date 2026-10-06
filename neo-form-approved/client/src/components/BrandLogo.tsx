import Logo from "@/components/Logo";

type BrandLogoProps = {
  className?: string;
  tone?: "light" | "dark";
};

export default function BrandLogo({ className = "h-11 sm:h-12", tone = "light" }: BrandLogoProps) {
  return <Logo className={className} linked={false} tone={tone} />;
}
