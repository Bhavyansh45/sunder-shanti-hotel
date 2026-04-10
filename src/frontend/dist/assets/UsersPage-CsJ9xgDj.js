import { c as createLucideIcon, j as jsxRuntimeExports, X, l as cn, r as reactExports, k as useComposedRefs, G as useUsers, n as useIsAdmin, u as useAuth, B as Button, U as Users, H as UserRole, o as ue, p as Badge, I as Principal } from "./index-DkGMr7Y2.js";
import { C as ConfirmDialog } from "./ConfirmDialog-zlDuC272.js";
import { E as EmptyState } from "./EmptyState-ZjNAd_UQ.js";
import { T as TableSkeleton } from "./LoadingSkeleton-HBICWUiF.js";
import { P as PageHeader, f as formatDate } from "./PageHeader-DWaItQZG.js";
import { j as Root, C as Content, k as Close, T as Title, l as Portal, O as Overlay } from "./alert-dialog-CW2Sxwww.js";
import { I as Input } from "./input-BLwqETdS.js";
import { L as Label } from "./label-BJHkssmg.js";
import { u as useControllableState, a as Primitive, c as composeEventHandlers, P as Presence, b as createContextScope } from "./index-DDLz35mE.js";
import { R as Root$1, I as Item, c as createRovingFocusGroupScope } from "./index-B2287EBg.js";
import { u as useDirection } from "./index-CKEwVOdo.js";
import { u as usePrevious, a as useSize, T as Table, b as TableHeader, c as TableRow, d as TableHead, e as TableBody, f as TableCell, S as Sheet, g as SheetContent, h as SheetHeader, i as SheetTitle, j as SheetDescription, k as SheetFooter } from "./table-BPtYpCB6.js";
import { g as useDeactivateUser, h as useAddUser, i as useUpdateUserRole } from "./mutations-CwTLAjvd.js";
import { S as ShieldAlert } from "./shield-alert-Bkg7jJ6R.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
var RADIO_NAME = "Radio";
var [createRadioContext, createRadioScope] = createContextScope(RADIO_NAME);
var [RadioProvider, useRadioContext] = createRadioContext(RADIO_NAME);
var Radio = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRadio,
      name,
      checked = false,
      required,
      disabled,
      value = "on",
      onCheck,
      form,
      ...radioProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioProvider, { scope: __scopeRadio, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": checked,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...radioProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            if (!checked) onCheck == null ? void 0 : onCheck();
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        RadioBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Radio.displayName = RADIO_NAME;
var INDICATOR_NAME = "RadioIndicator";
var RadioIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadio, forceMount, ...indicatorProps } = props;
    const context = useRadioContext(INDICATOR_NAME, __scopeRadio);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.checked, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...indicatorProps,
        ref: forwardedRef
      }
    ) });
  }
);
RadioIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "RadioBubbleInput";
var RadioBubbleInput = reactExports.forwardRef(
  ({
    __scopeRadio,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "radio",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
RadioBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
var RADIO_GROUP_NAME = "RadioGroup";
var [createRadioGroupContext] = createContextScope(RADIO_GROUP_NAME, [
  createRovingFocusGroupScope,
  createRadioScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var useRadioScope = createRadioScope();
var [RadioGroupProvider, useRadioGroupContext] = createRadioGroupContext(RADIO_GROUP_NAME);
var RadioGroup$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRadioGroup,
      name,
      defaultValue,
      value: valueProp,
      required = false,
      disabled = false,
      orientation,
      dir,
      loop = true,
      onValueChange,
      ...groupProps
    } = props;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? null,
      onChange: onValueChange,
      caller: RADIO_GROUP_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      RadioGroupProvider,
      {
        scope: __scopeRadioGroup,
        name,
        required,
        disabled,
        value,
        onValueChange: setValue,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root$1,
          {
            asChild: true,
            ...rovingFocusGroupScope,
            orientation,
            dir: direction,
            loop,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Primitive.div,
              {
                role: "radiogroup",
                "aria-required": required,
                "aria-orientation": orientation,
                "data-disabled": disabled ? "" : void 0,
                dir: direction,
                ...groupProps,
                ref: forwardedRef
              }
            )
          }
        )
      }
    );
  }
);
RadioGroup$1.displayName = RADIO_GROUP_NAME;
var ITEM_NAME = "RadioGroupItem";
var RadioGroupItem$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadioGroup, disabled, ...itemProps } = props;
    const context = useRadioGroupContext(ITEM_NAME, __scopeRadioGroup);
    const isDisabled = context.disabled || disabled;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const radioScope = useRadioScope(__scopeRadioGroup);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const checked = context.value === itemProps.value;
    const isArrowKeyPressedRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      const handleKeyDown = (event) => {
        if (ARROW_KEYS.includes(event.key)) {
          isArrowKeyPressedRef.current = true;
        }
      };
      const handleKeyUp = () => isArrowKeyPressedRef.current = false;
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !isDisabled,
        active: checked,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Radio,
          {
            disabled: isDisabled,
            required: context.required,
            checked,
            ...radioScope,
            ...itemProps,
            name: context.name,
            ref: composedRefs,
            onCheck: () => context.onValueChange(itemProps.value),
            onKeyDown: composeEventHandlers((event) => {
              if (event.key === "Enter") event.preventDefault();
            }),
            onFocus: composeEventHandlers(itemProps.onFocus, () => {
              var _a;
              if (isArrowKeyPressedRef.current) (_a = ref.current) == null ? void 0 : _a.click();
            })
          }
        )
      }
    );
  }
);
RadioGroupItem$1.displayName = ITEM_NAME;
var INDICATOR_NAME2 = "RadioGroupIndicator";
var RadioGroupIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadioGroup, ...indicatorProps } = props;
    const radioScope = useRadioScope(__scopeRadioGroup);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioIndicator, { ...radioScope, ...indicatorProps, ref: forwardedRef });
  }
);
RadioGroupIndicator.displayName = INDICATOR_NAME2;
var Root2 = RadioGroup$1;
var Item2 = RadioGroupItem$1;
var Indicator = RadioGroupIndicator;
function RadioGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "radio-group",
      className: cn("grid gap-3", className),
      ...props
    }
  );
}
function RadioGroupItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item2,
    {
      "data-slot": "radio-group-item",
      className: cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" })
        }
      )
    }
  );
}
function AddUserSheet({ open, onOpenChange }) {
  const addUser = useAddUser();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [principalText, setPrincipalText] = reactExports.useState("");
  const [role, setRole] = reactExports.useState(UserRole.Staff);
  const [errors, setErrors] = reactExports.useState({});
  function validate() {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Enter a valid email";
    if (!principalText.trim()) errs.principal = "Principal is required";
    else {
      try {
        Principal.fromText(principalText.trim());
      } catch {
        errs.principal = "Invalid Internet Identity principal format";
      }
    }
    return errs;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      await addUser.mutateAsync({
        principal: Principal.fromText(principalText.trim()),
        name: name.trim(),
        email: email.trim(),
        role
      });
      ue.success("User added successfully");
      onOpenChange(false);
      setName("");
      setEmail("");
      setPrincipalText("");
      setRole(UserRole.Staff);
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to add user");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { className: "w-full sm:max-w-md overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display", children: "Add Staff Member" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Grant a new user access to Sunder Shanti Hotel system." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "user-name", children: [
            "Full Name ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "user-name",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "e.g. Priya Sharma",
              "data-ocid": "add-user-name",
              "aria-invalid": !!errors.name
            }
          ),
          errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "user-email", children: [
            "Email ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "user-email",
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "priya@example.com",
              "data-ocid": "add-user-email",
              "aria-invalid": !!errors.email
            }
          ),
          errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "user-principal", children: [
            "Internet Identity Principal",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "user-principal",
              value: principalText,
              onChange: (e) => setPrincipalText(e.target.value),
              placeholder: "xxxxx-xxxxx-xxxxx-xxxxx-cai",
              className: "font-mono text-xs",
              "data-ocid": "add-user-principal",
              "aria-invalid": !!errors.principal
            }
          ),
          errors.principal ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.principal }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "The user must log in with the Internet Identity matching this Principal." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
            "Role ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            RadioGroup,
            {
              value: role,
              onValueChange: (v) => setRole(v),
              className: "flex gap-6",
              "data-ocid": "add-user-role",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: UserRole.Staff, id: "role-staff" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "role-staff",
                      className: "cursor-pointer font-normal",
                      children: "Staff"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: UserRole.Admin, id: "role-admin" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "role-admin",
                      className: "cursor-pointer font-normal",
                      children: "Admin"
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/60 border border-border px-4 py-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Note:" }),
          " The user must log in with the Internet Identity matching this Principal to access the system."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetFooter, { className: "mt-8 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => onOpenChange(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: addUser.isPending,
            "data-ocid": "add-user-submit",
            children: addUser.isPending ? "Adding…" : "Add User"
          }
        )
      ] })
    ] })
  ] }) });
}
function ChangeRoleDialog({ user, onClose }) {
  const updateRole = useUpdateUserRole();
  const newRole = (user == null ? void 0 : user.role) === UserRole.Admin ? UserRole.Staff : UserRole.Admin;
  async function handleConfirm() {
    if (!user) return;
    try {
      await updateRole.mutateAsync({
        principal: user.principal,
        role: newRole
      });
      ue.success(`${user.name}'s role updated to ${newRole}`);
      onClose();
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to update role");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!user, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "change-role-dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Change Role" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground py-2", children: [
      "Change",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: user == null ? void 0 : user.name }),
      "'s role to",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: newRole }),
      "?"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onClose, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleConfirm,
          disabled: updateRole.isPending,
          "data-ocid": "change-role-confirm",
          children: updateRole.isPending ? "Updating…" : `Set as ${newRole}`
        }
      )
    ] })
  ] }) });
}
function RoleBadge({ role }) {
  if (role === UserRole.Admin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        className: "bg-accent/20 text-accent-foreground border-accent/40 font-medium",
        variant: "outline",
        children: "Admin"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      className: "bg-primary/15 text-primary border-primary/30 font-medium",
      variant: "outline",
      children: "Staff"
    }
  );
}
function StatusBadge({ isActive }) {
  if (isActive) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        className: "bg-emerald-50 text-emerald-700 border-emerald-200 font-medium",
        variant: "outline",
        children: "Active"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      className: "bg-muted text-muted-foreground border-border font-medium",
      variant: "outline",
      children: "Inactive"
    }
  );
}
function UsersPage() {
  const { data: users, isLoading } = useUsers();
  const { data: isAdmin } = useIsAdmin();
  const { principal } = useAuth();
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [changeRoleTarget, setChangeRoleTarget] = reactExports.useState(
    null
  );
  const [deactivateTarget, setDeactivateTarget] = reactExports.useState(
    null
  );
  const deactivate = useDeactivateUser();
  const currentPrincipalText = principal == null ? void 0 : principal.toText();
  const bootstrapNotice = !isLoading && users && users.length <= 1;
  async function handleDeactivate() {
    if (!deactivateTarget) return;
    try {
      await deactivate.mutateAsync(deactivateTarget.principal);
      const action = deactivateTarget.isActive ? "deactivated" : "reactivated";
      ue.success(`${deactivateTarget.name} ${action} successfully`);
      setDeactivateTarget(null);
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Action failed");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Staff Users",
        description: "Manage hotel staff access and permissions",
        breadcrumbs: [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Users" }
        ],
        action: isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setAddOpen(true), "data-ocid": "add-user-btn", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 16, className: "mr-2" }),
          "Add User"
        ] }) : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-6", children: [
      bootstrapNotice && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mb-5 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3.5 text-sm",
          "data-ocid": "bootstrap-notice",
          role: "alert",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { size: 18, className: "text-primary mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "You are the first admin." }),
              " ",
              "Add staff members to grant them access to the system."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card overflow-hidden shadow-subtle", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows: 5, cols: 6 }) : !users || users.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 28 }),
          title: "No staff users yet",
          description: "Add your first staff member to grant them access to the hotel system.",
          action: {
            label: "Add User",
            onClick: () => setAddOpen(true),
            dataOcid: "empty-state-add-user"
          }
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40 hover:bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground", children: "Added" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-foreground text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: users.map((user) => {
          const isSelf = user.principal.toText() === currentPrincipalText;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TableRow,
            {
              className: "hover:bg-muted/20 transition-colors",
              "data-ocid": "user-row",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: user.name }),
                  isSelf && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-normal shrink-0", children: "(You)" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground truncate max-w-[180px]", children: user.email }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: user.role }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { isActive: user.isActive }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm", children: formatDate(user.createdAt) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "h-8 px-3 text-xs",
                      onClick: () => setChangeRoleTarget(user),
                      disabled: isSelf,
                      "data-ocid": "change-role-btn",
                      title: isSelf ? "Cannot change your own role" : "Change role",
                      "aria-label": `Change role for ${user.name}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 13, className: "mr-1.5" }),
                        user.role === UserRole.Admin ? "Set Staff" : "Set Admin"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: `h-8 px-3 text-xs ${user.isActive ? "text-destructive hover:text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:text-foreground"}`,
                      onClick: () => setDeactivateTarget(user),
                      disabled: isSelf,
                      "data-ocid": "deactivate-btn",
                      title: isSelf ? "Cannot deactivate yourself" : user.isActive ? "Deactivate user" : "Reactivate user",
                      "aria-label": user.isActive ? `Deactivate ${user.name}` : `Reactivate ${user.name}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { size: 13, className: "mr-1.5" }),
                        user.isActive ? "Deactivate" : "Reactivate"
                      ]
                    }
                  )
                ] }) })
              ]
            },
            user.principal.toText()
          );
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddUserSheet, { open: addOpen, onOpenChange: setAddOpen }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChangeRoleDialog,
      {
        user: changeRoleTarget,
        onClose: () => setChangeRoleTarget(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: !!deactivateTarget,
        onOpenChange: (open) => !open && setDeactivateTarget(null),
        title: (deactivateTarget == null ? void 0 : deactivateTarget.isActive) ? "Deactivate User" : "Reactivate User",
        description: (deactivateTarget == null ? void 0 : deactivateTarget.isActive) ? `Deactivate ${deactivateTarget == null ? void 0 : deactivateTarget.name}? They will no longer be able to access the system.` : `Reactivate ${deactivateTarget == null ? void 0 : deactivateTarget.name}? They will regain access to the system.`,
        confirmLabel: (deactivateTarget == null ? void 0 : deactivateTarget.isActive) ? "Deactivate" : "Reactivate",
        variant: (deactivateTarget == null ? void 0 : deactivateTarget.isActive) ? "destructive" : "default",
        onConfirm: handleDeactivate,
        loading: deactivate.isPending
      }
    )
  ] });
}
export {
  UsersPage as default
};
