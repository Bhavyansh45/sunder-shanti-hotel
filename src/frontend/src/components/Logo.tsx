interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon";
  className?: string;
}

const sizeMap = {
  sm: {
    icon: 24,
    titleSize: "text-sm",
    subtitleSize: "text-[9px]",
    gap: "gap-1.5",
  },
  md: {
    icon: 32,
    titleSize: "text-base",
    subtitleSize: "text-[10px]",
    gap: "gap-2",
  },
  lg: {
    icon: 44,
    titleSize: "text-xl",
    subtitleSize: "text-xs",
    gap: "gap-2.5",
  },
  xl: {
    icon: 64,
    titleSize: "text-3xl",
    subtitleSize: "text-sm",
    gap: "gap-3",
  },
};

export function Logo({
  size = "md",
  variant = "full",
  className = "",
}: LogoProps) {
  const { icon, titleSize, subtitleSize, gap } = sizeMap[size];

  return (
    <div className={`flex items-center ${gap} ${className}`}>
      {/* SVG icon: lotus above keyhole */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer circle frame */}
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="oklch(0.65 0.14 70)"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          opacity="0.5"
        />
        {/* Lotus petals */}
        <path
          d="M24 8 C20 12 18 16 24 18 C30 16 28 12 24 8Z"
          fill="oklch(0.65 0.14 70)"
          opacity="0.9"
        />
        <path
          d="M24 8 C16 10 13 15 18 19 C21 17 22 13 24 8Z"
          fill="oklch(0.65 0.14 70)"
          opacity="0.7"
        />
        <path
          d="M24 8 C32 10 35 15 30 19 C27 17 26 13 24 8Z"
          fill="oklch(0.65 0.14 70)"
          opacity="0.7"
        />
        <path
          d="M24 8 C12 9 9 16 14 21 C18 20 20 15 24 8Z"
          fill="oklch(0.65 0.14 70)"
          opacity="0.5"
        />
        <path
          d="M24 8 C36 9 39 16 34 21 C30 20 28 15 24 8Z"
          fill="oklch(0.65 0.14 70)"
          opacity="0.5"
        />
        {/* Lotus center */}
        <circle cx="24" cy="20" r="3.5" fill="oklch(0.65 0.14 70)" />
        {/* Key hole body */}
        <circle cx="24" cy="30" r="4.5" fill="oklch(0.52 0.12 160)" />
        <rect
          x="22.2"
          y="30"
          width="3.6"
          height="7"
          rx="1.2"
          fill="oklch(0.52 0.12 160)"
        />
        {/* Keyhole negative */}
        <circle cx="24" cy="30" r="2" fill="oklch(0.96 0.015 75)" />
        {/* Bottom line separator */}
        <line
          x1="14"
          y1="42"
          x2="34"
          y2="42"
          stroke="oklch(0.65 0.14 70)"
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>

      {variant === "full" && (
        <div className="flex flex-col leading-tight">
          <span
            className={`font-display font-bold tracking-wide text-sidebar-foreground ${titleSize}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Sunder Shanti
          </span>
          <span
            className={`uppercase tracking-[0.2em] font-body font-medium text-sidebar-primary ${subtitleSize}`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            Hotel
          </span>
        </div>
      )}
    </div>
  );
}

export function LogoLight({
  size = "md",
  variant = "full",
  className = "",
}: LogoProps) {
  const { icon, titleSize, subtitleSize, gap } = sizeMap[size];

  return (
    <div className={`flex items-center ${gap} ${className}`}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="oklch(0.65 0.14 70)"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          opacity="0.4"
        />
        <path
          d="M24 8 C20 12 18 16 24 18 C30 16 28 12 24 8Z"
          fill="oklch(0.65 0.14 70)"
          opacity="0.9"
        />
        <path
          d="M24 8 C16 10 13 15 18 19 C21 17 22 13 24 8Z"
          fill="oklch(0.65 0.14 70)"
          opacity="0.7"
        />
        <path
          d="M24 8 C32 10 35 15 30 19 C27 17 26 13 24 8Z"
          fill="oklch(0.65 0.14 70)"
          opacity="0.7"
        />
        <path
          d="M24 8 C12 9 9 16 14 21 C18 20 20 15 24 8Z"
          fill="oklch(0.65 0.14 70)"
          opacity="0.5"
        />
        <path
          d="M24 8 C36 9 39 16 34 21 C30 20 28 15 24 8Z"
          fill="oklch(0.65 0.14 70)"
          opacity="0.5"
        />
        <circle cx="24" cy="20" r="3.5" fill="oklch(0.65 0.14 70)" />
        <circle cx="24" cy="30" r="4.5" fill="oklch(0.52 0.12 160)" />
        <rect
          x="22.2"
          y="30"
          width="3.6"
          height="7"
          rx="1.2"
          fill="oklch(0.52 0.12 160)"
        />
        <circle cx="24" cy="30" r="2" fill="oklch(0.96 0.015 75)" />
        <line
          x1="14"
          y1="42"
          x2="34"
          y2="42"
          stroke="oklch(0.65 0.14 70)"
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>

      {variant === "full" && (
        <div className="flex flex-col leading-tight">
          <span
            className={`font-display font-bold tracking-wide text-foreground ${titleSize}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Sunder Shanti
          </span>
          <span
            className={`uppercase tracking-[0.2em] font-body font-medium text-accent ${subtitleSize}`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            Hotel
          </span>
        </div>
      )}
    </div>
  );
}
