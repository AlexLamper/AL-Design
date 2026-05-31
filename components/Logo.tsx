import Image from "next/image";

type LogoProps = {
  className?: string;
  /**
   * Which artwork to use. "default"/"light" → white logo (for the dark UI),
   * "dark" → black logo (for light backgrounds).
   */
  variant?: "default" | "light" | "dark";
};

export default function Logo({ className, variant = "default" }: LogoProps) {
  const src =
    variant === "dark" ? "/logo/al-design-dark-trim.png" : "/logo/al-design-white-trim.png";
  const autoClass = variant === "default" ? "logo-auto" : "";
  return (
    <Image
      src={src}
      alt="AL Design"
      width={512}
      height={512}
      priority
      className={`${autoClass} ${className ?? ""}`.trim()}
    />
  );
}
