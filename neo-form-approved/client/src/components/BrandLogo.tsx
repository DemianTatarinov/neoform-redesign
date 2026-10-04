type BrandLogoProps = {
  className?: string;
};

export default function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <img
      src="/logo/logo.png"
      alt="Neo Form"
      className={`h-8 md:h-10 w-auto object-contain ${className}`.trim()}
    />
  );
}
