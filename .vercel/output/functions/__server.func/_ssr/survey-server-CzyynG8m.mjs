import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as string, i as record, r as object, s as unknown } from "../_libs/zod.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/survey-server-CzyynG8m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-out select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 active:enabled:scale-[0.96]", {
	variants: {
		variant: {
			ink: "bg-ink text-ink-fg shadow-card hover:bg-fg",
			primary: "bg-primary text-primary-fg shadow-card hover:opacity-90",
			outline: "bg-surface text-fg shadow-card hover:shadow-card-hover",
			ghost: "bg-transparent text-muted hover:text-fg hover:bg-surface-2/60"
		},
		size: {
			default: "h-12 rounded-md px-5 text-sm",
			lg: "h-14 rounded-lg px-6 text-base",
			sm: "h-10 rounded-sm px-3.5 text-sm",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "ink",
		size: "default"
	}
});
var Button = (0, import_react.forwardRef)(function Button({ className, variant, size, type = "button", asChild = false, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		ref,
		type: asChild ? void 0 : type,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
});
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var submitSurvey = createServerFn({ method: "POST" }).validator((data) => object({ answers: record(string(), unknown()) }).parse(data)).handler(createSsrRpc("24c0a08176a7528040c09f15db1d5e7ba334d27610b08a22b412bf72ba7d49fe"));
var getResults = createServerFn({ method: "POST" }).validator((data) => object({ password: string().min(1).max(200) }).parse(data)).handler(createSsrRpc("50887c27cb6d96f129d0c66affb41a2b56f6018a969745bf993cf6a5db0ab634"));
//#endregion
export { submitSurvey as i, cn as n, getResults as r, Button as t };
