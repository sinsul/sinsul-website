import Image from "next/image";

interface SinsulLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { width: 112, height: 36 },
  md: { width: 141, height: 45 },
  lg: { width: 197, height: 63 },
};

export default function SinsulLogo({ className = "", size = "md" }: SinsulLogoProps) {
  const { width, height } = sizes[size];
  return (
    <Image
      src="/images/logo.svg"
      alt="주식회사 신설 로고"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
