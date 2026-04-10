import { j as jsxRuntimeExports } from "./index-DkGMr7Y2.js";
import { S as Skeleton } from "./PageHeader-DWaItQZG.js";
function TableSkeleton({ rows = 5, cols = 5 }) {
  const rowArr = Array.from({ length: rows }, (_, i) => i);
  const colArr = Array.from({ length: cols }, (_, i) => i);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 p-4", "data-ocid": "loading-skeleton-table", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: colArr.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 flex-1" }, `header-${c}`)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border" }),
    rowArr.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 items-center", children: colArr.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Skeleton,
      {
        className: `h-4 ${c === 0 ? "w-8 flex-none" : "flex-1"}`
      },
      `cell-${r}-${c}`
    )) }, `row-${r}`))
  ] });
}
function FormSkeleton() {
  const fields = Array.from({ length: 4 }, (_, i) => i);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 p-6", "data-ocid": "loading-skeleton-form", children: [
    fields.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" })
    ] }, `field-${i}`)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-32 mt-6" })
  ] });
}
export {
  FormSkeleton as F,
  TableSkeleton as T
};
