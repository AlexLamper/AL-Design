type LogoProps = {
  className?: string;
  /** Use light text for dark backgrounds (e.g. footer). */
  variant?: "default" | "light";
};

export default function Logo({ className, variant = "default" }: LogoProps) {
  const wordColor = variant === "light" ? "#ffffff" : "#0f172a";
  return (
    <svg
      className={className}
      viewBox="0 0 168 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="AL Design"
    >
      {/* Monogram mark */}
      <defs>
        <linearGradient id="al-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <rect x="0" y="2" width="36" height="36" rx="11" fill="url(#al-grad)" />
      <path
        d="M11 27.5 16.4 13h3.3l5.4 14.5h-3.3l-1.05-3.05h-5.4L14.3 27.5H11Zm4.25-5.55h3.6L17.05 16.7l-1.8 5.25Z"
        fill="#fff"
      />
      <path d="M26.2 27.5V13h2.05v12.6h-1.1Z" fill="#fff" opacity="0.85" />
      {/* Wordmark */}
      <text
        x="46"
        y="27"
        fontFamily="var(--font-sora), system-ui, sans-serif"
        fontSize="20"
        fontWeight="700"
        fill={wordColor}
        letterSpacing="-0.5"
      >
        AL
        <tspan fill="#6366f1"> Design</tspan>
      </text>
    </svg>
  );
}
