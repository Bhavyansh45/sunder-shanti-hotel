import { j as jsxRuntimeExports, B as Button } from "./index-DkGMr7Y2.js";
function EmptyState({
  icon,
  title,
  description,
  action,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex flex-col items-center justify-center py-16 px-4 text-center ${className}`,
      "data-ocid": "empty-state",
      children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 p-4 rounded-full bg-muted text-muted-foreground", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground mb-1", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mb-5", children: description }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: action.onClick,
            size: "sm",
            "data-ocid": action.dataOcid ?? "empty-state-action",
            children: action.label
          }
        )
      ]
    }
  );
}
export {
  EmptyState as E
};
