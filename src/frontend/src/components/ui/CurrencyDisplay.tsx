import { formatCurrency } from "../../lib/utils-hotel";

interface CurrencyDisplayProps {
  amount: number;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showSign?: boolean;
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl font-semibold",
  xl: "text-2xl font-bold",
};

export function CurrencyDisplay({
  amount,
  className = "",
  size = "md",
  showSign = false,
}: CurrencyDisplayProps) {
  const formatted = formatCurrency(Math.abs(amount));
  const isNegative = amount < 0;
  return (
    <span
      className={`font-mono tabular-nums ${sizeClasses[size]} ${className}`}
      aria-label={`${isNegative ? "negative " : ""}${formatted}`}
    >
      {showSign && !isNegative && "+"}
      {isNegative && "−"}
      {formatted}
    </span>
  );
}
