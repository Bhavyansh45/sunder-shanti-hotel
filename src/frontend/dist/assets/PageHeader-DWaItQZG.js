import { j as jsxRuntimeExports, l as cn } from "./index-DkGMr7Y2.js";
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function timestampToDate(ts) {
  return new Date(Number(ts / 1000000n));
}
function dateToTimestamp(date) {
  return BigInt(date.getTime()) * 1000000n;
}
function formatDate(ts) {
  return timestampToDate(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function formatDateTime(ts) {
  return timestampToDate(ts).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function calcNights(checkIn, checkOut) {
  const msIn = Number(checkIn / 1000000n);
  const msOut = Number(checkOut / 1000000n);
  const diff = msOut - msIn;
  return Math.max(1, Math.ceil(diff / (1e3 * 60 * 60 * 24)));
}
function unwrapResult(result) {
  if (result.__kind__ === "err") {
    throw new Error(result.err);
  }
  return result.ok;
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
function PageHeader({
  title,
  description,
  breadcrumbs,
  action,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `bg-card border-b border-border px-6 py-5 ${className}`,
      "data-ocid": "page-header",
      children: [
        breadcrumbs && breadcrumbs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "mb-1", "aria-label": "Breadcrumb", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: breadcrumbs.map((crumb, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-1.5", children: [
          i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "›" }),
          crumb.href ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: crumb.href,
              className: "hover:text-foreground transition-colors",
              children: crumb.label
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: i === breadcrumbs.length - 1 ? "text-foreground font-medium" : "",
              children: crumb.label
            }
          )
        ] }, crumb.label)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-semibold text-foreground tracking-tight", children: title }),
            description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: description })
          ] }),
          action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: action })
        ] })
      ]
    }
  );
}
export {
  PageHeader as P,
  Skeleton as S,
  formatCurrency as a,
  formatDateTime as b,
  calcNights as c,
  dateToTimestamp as d,
  formatDate as f,
  unwrapResult as u
};
