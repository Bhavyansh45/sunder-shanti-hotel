import { j as jsxRuntimeExports } from "./index-DkGMr7Y2.js";
import { a as formatCurrency } from "./PageHeader-DWaItQZG.js";
const sizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl font-semibold",
  xl: "text-2xl font-bold"
};
function CurrencyDisplay({
  amount,
  className = "",
  size = "md",
  showSign = false
}) {
  const formatted = formatCurrency(Math.abs(amount));
  const isNegative = amount < 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `font-mono tabular-nums ${sizeClasses[size]} ${className}`,
      "aria-label": `${isNegative ? "negative " : ""}${formatted}`,
      children: [
        showSign && !isNegative && "+",
        isNegative && "−",
        formatted
      ]
    }
  );
}
export {
  CurrencyDisplay as C
};
