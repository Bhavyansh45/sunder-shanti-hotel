import { j as jsxRuntimeExports, l as cn, J as buttonVariants } from "./index-DkGMr7Y2.js";
import { A as AlertDialog, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, i as AlertDialogAction } from "./alert-dialog-CW2Sxwww.js";
function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "destructive",
  onConfirm,
  loading = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "confirm-dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "confirm-dialog-cancel", children: cancelLabel }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AlertDialogAction,
        {
          onClick: onConfirm,
          disabled: loading,
          "data-ocid": "confirm-dialog-confirm",
          className: cn(
            variant === "destructive" ? buttonVariants({ variant: "destructive" }) : buttonVariants({ variant: "default" })
          ),
          children: loading ? "Processing…" : confirmLabel
        }
      )
    ] })
  ] }) });
}
export {
  ConfirmDialog as C
};
