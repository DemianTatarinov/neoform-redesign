import Logo from "@/components/Logo";

type BrandLogoProps = {
  className?: string;
};

export default function BrandLogo({ className = "h-12 sm:h-14" }: BrandLogoProps) {
  return <Logo className={className} linked={false} />;
}
