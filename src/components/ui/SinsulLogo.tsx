import Image from "next/image";

type Size = "sm" | "md" | "lg";
const sizes: Record<Size, number> = { sm: 100, md: 130, lg: 160 };

export default function SinsulLogo({ size = "md" }: { size?: Size }) {
  const w = sizes[size];
  return (
    <Image
      src="/logo.svg"
      alt="신설 로고"
      width={w}
      height={Math.round(w * 0.42)}
      priority
      style={{ display: "block" }}
    />
  );
}
