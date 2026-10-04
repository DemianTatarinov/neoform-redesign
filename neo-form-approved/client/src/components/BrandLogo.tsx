import Logo from "@/components/Logo";

type BrandLogoProps = {
  className?: string;
};

export default function BrandLogo({ className = "h-11 sm:h-12" }: BrandLogoProps) {
  return <Logo className={className} linked={false} />;
}
