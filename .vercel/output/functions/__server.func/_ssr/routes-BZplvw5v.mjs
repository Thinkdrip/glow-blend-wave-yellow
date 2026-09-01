import { o as __toESM } from "../_runtime.mjs";
import { a as QUESTIONS, d as isAnswered, f as parseManager, h as summarizeAnswer, n as HABITS, t as EMPTY_MANAGER } from "./survey-Da1vCcTb.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as submitSurvey, n as cn, t as Button } from "./survey-server-CzyynG8m.mjs";
import { i as ArrowLeft, n as Check, r as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BZplvw5v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = (0, import_react.forwardRef)(function Textarea({ className, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		ref,
		className: cn("min-h-32 w-full resize-y rounded-md bg-surface px-4 py-3.5 text-base leading-relaxed text-fg shadow-card placeholder:text-subtle", "transition-[box-shadow] duration-150 ease-out", "hover:shadow-card-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg", "disabled:opacity-50", className),
		...props
	});
});
function PatioLogo({ className, size = "md" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/logo.png",
		alt: "the Patio",
		className: cn("w-auto object-contain object-center", size === "lg" ? "h-28 sm:h-36" : size === "sm" ? "h-12" : "h-20", className)
	});
}
function ChoiceList({ options, value, multi = false, max, onChange }) {
	const selected = new Set(Array.isArray(value) ? value : value ? [value] : []);
	function toggle(id) {
		if (!multi) {
			onChange(id);
			return;
		}
		const next = new Set(selected);
		if (next.has(id)) next.delete(id);
		else {
			if (max && next.size >= max) return;
			next.add(id);
		}
		onChange([...next]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: multi ? "group" : "radiogroup",
		className: "flex flex-col gap-2",
		children: options.map((option) => {
			const on = selected.has(option.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: multi ? "checkbox" : "radio",
				"aria-checked": on,
				onClick: () => toggle(option.id),
				className: cn("flex min-h-12 w-full items-center gap-3 rounded-md bg-surface px-4 py-3.5 text-left shadow-card", "transition-[transform,box-shadow,background-color] duration-150 ease-out", "hover:shadow-card-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg", "active:scale-[0.99]", on && "bg-primary/10 shadow-card-hover"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("flex size-5 shrink-0 items-center justify-center border border-border", multi ? "rounded-sm" : "rounded-full", on ? "border-primary bg-primary text-primary-fg" : "bg-surface"),
					children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "size-3",
						strokeWidth: 3
					}) : null
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium leading-snug text-fg",
					children: option.label
				})]
			}, option.id);
		})
	});
}
var SCALE = [
	1,
	2,
	3,
	4,
	5
];
function Scale({ value, minLabel, maxLabel, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "radiogroup",
		className: "grid grid-cols-5 gap-2",
		"aria-label": "Rating from 1 to 5",
		children: SCALE.map((n) => {
			const on = value === n;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "radio",
				"aria-checked": on,
				"aria-label": `${n} of 5`,
				onClick: () => onChange(n),
				className: cn("flex h-14 items-center justify-center rounded-md font-sans text-lg font-semibold tabular-nums shadow-card", "transition-[transform,background-color,color,box-shadow] duration-150 ease-out", "hover:shadow-card-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg", "active:scale-[0.96]", on ? "bg-ink text-ink-fg" : "bg-surface text-fg"),
				children: n
			}, n);
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 flex items-start justify-between gap-4 text-xs font-medium tracking-wide text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex-1",
			children: minLabel
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex-1 text-right",
			children: maxLabel
		})]
	})] });
}
function HabitRow({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface px-4 py-3 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium leading-snug text-fg",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "radiogroup",
			"aria-label": label,
			className: "mt-2.5 grid grid-cols-5 gap-1.5",
			children: SCALE.map((n) => {
				const on = value === n;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "radio",
					"aria-checked": on,
					"aria-label": `${n} of 5`,
					onClick: () => onChange(n),
					className: cn("flex h-11 items-center justify-center rounded-md font-sans text-sm font-semibold tabular-nums", "transition-[transform,background-color,color] duration-150 ease-out", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface", "active:scale-[0.96]", on ? "bg-ink text-ink-fg" : "bg-bg text-fg shadow-card"),
					children: n
				}, n);
			})
		})]
	});
}
function ManagerPair({ name, value, onChange }) {
	function setHabit(habitId, n) {
		onChange({
			...value,
			skipped: false,
			habits: {
				...value.habits,
				[habitId]: n
			}
		});
	}
	if (value.skipped) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface px-5 py-6 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm leading-relaxed text-muted",
			children: [
				"You have not worked with ",
				name,
				" in the last 3 months."
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "outline",
			className: "mt-5",
			onClick: () => onChange({ ...EMPTY_MANAGER }),
			children: ["I have worked with ", name]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-medium text-fg",
					children: [
						"How well does ",
						name,
						" manage the store?"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs font-medium text-subtle",
					children: "1 rarely · 5 consistently"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-col gap-3",
					children: HABITS.map((habit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitRow, {
						label: habit.label,
						value: value.habits[habit.id],
						onChange: (n) => setHabit(habit.id, n)
					}, habit.id))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					htmlFor: `strength-${name}`,
					className: "mb-2 block text-sm font-medium text-fg",
					children: [name, "’s greatest strength as a manager"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: `strength-${name}`,
					value: value.strength,
					rows: 3,
					placeholder: "Optional — what they do well…",
					maxLength: 2e3,
					className: "min-h-24",
					onChange: (e) => onChange({
						...value,
						skipped: false,
						strength: e.target.value
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex justify-between text-xs text-subtle",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Optional" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: value.strength.trim().length
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					htmlFor: `weakness-${name}`,
					className: "mb-2 block text-sm font-medium text-fg",
					children: [name, "’s greatest weakness as a manager"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: `weakness-${name}`,
					value: value.weakness,
					rows: 3,
					placeholder: "Optional — what needs to change…",
					maxLength: 2e3,
					className: "min-h-24",
					onChange: (e) => onChange({
						...value,
						skipped: false,
						weakness: e.target.value
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex justify-between text-xs text-subtle",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Optional" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: value.weakness.trim().length
					})]
				})
			] })
		]
	});
}
var useSurvey = create()(persist((set, get) => ({
	screen: "welcome",
	index: 0,
	answers: {},
	submitted: false,
	setAnswer: (id, value) => set((s) => ({ answers: {
		...s.answers,
		[id]: value
	} })),
	start: () => set({
		screen: "question",
		index: 0,
		answers: {},
		submitted: false
	}),
	resume: () => {
		const { answers, submitted } = get();
		if (submitted) {
			set({ screen: "thanks" });
			return;
		}
		const idx = QUESTIONS.findIndex((q) => !isAnswered(q, answers[q.id]));
		set({
			screen: "question",
			index: idx === -1 ? QUESTIONS.length - 1 : idx
		});
	},
	next: () => {
		const { screen, index } = get();
		if (screen === "question") {
			if (index >= QUESTIONS.length - 1) {
				set({ screen: "thanks" });
				return;
			}
			set({ index: index + 1 });
		}
	},
	back: () => {
		const { screen, index } = get();
		if (screen === "thanks") {
			set({
				screen: "question",
				index: QUESTIONS.length - 1
			});
			return;
		}
		if (screen === "question" && index === 0) {
			set({ screen: "welcome" });
			return;
		}
		if (screen === "question") set({ index: index - 1 });
	},
	reset: () => set({
		screen: "welcome",
		index: 0,
		answers: {},
		submitted: false
	}),
	markSubmitted: () => set({
		submitted: true,
		screen: "thanks"
	}),
	currentQuestion: () => {
		const { screen, index } = get();
		return screen === "question" ? QUESTIONS[index] ?? null : null;
	},
	canContinue: () => {
		const q = get().currentQuestion();
		return q ? isAnswered(q, get().answers[q.id]) : false;
	},
	hasDraft: () => {
		const { answers, submitted } = get();
		return !submitted && Object.keys(answers).length > 0;
	}
}), {
	name: "patio-pulse-foh-v1",
	partialize: (s) => ({
		index: s.index,
		answers: s.answers,
		submitted: s.submitted,
		screen: s.screen
	})
}));
function Bullet({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-2 size-1.5 shrink-0 rounded-full bg-primary",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children })]
	});
}
function Welcome() {
	const start = useSurvey((s) => s.start);
	const resume = useSurvey((s) => s.resume);
	const hasDraft = useSurvey((s) => s.hasDraft());
	const submitted = useSurvey((s) => s.submitted);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setHydrated(true);
	}, []);
	const showResume = hydrated && hasDraft && !submitted;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-10 pt-16 sm:pt-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "step-enter flex flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatioLogo, {
					size: "lg",
					className: "self-center"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 font-display text-3xl font-medium leading-tight tracking-tight text-fg sm:text-4xl",
					children: "Front of house feedback"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-base leading-relaxed text-muted",
					children: "For floor, register, drive thru, bagging, window, and FOH management. Your name is not collected. Answer based on the last 3 months."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-8 space-y-3 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullet, { children: "Cover the last 3 months of shifts." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullet, { children: "You will rate how each manager runs the store, then add a strength and a weakness if you have more to say." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullet, { children: "If this device is shared, submit, then start over." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex flex-col gap-3 pt-12",
					children: [
						showResume ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "lg",
							onClick: resume,
							className: "w-full",
							children: ["Continue where you left off", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "lg",
							onClick: start,
							className: "w-full",
							children: ["Start", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						}),
						showResume ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							variant: "outline",
							onClick: start,
							className: "w-full",
							children: "Start over"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/pulse",
							className: "mt-1 inline-flex h-11 items-center justify-center text-sm font-medium text-muted transition-colors duration-150 hover:text-fg",
							children: "Manager results"
						})
					]
				})
			]
		})
	});
}
function QuestionStep() {
	const index = useSurvey((s) => s.index);
	const answers = useSurvey((s) => s.answers);
	const setAnswer = useSurvey((s) => s.setAnswer);
	const next = useSurvey((s) => s.next);
	const back = useSurvey((s) => s.back);
	const question = QUESTIONS[Math.min(index, QUESTIONS.length - 1)];
	const headingRef = (0, import_react.useRef)(null);
	const value = answers[question.id];
	const ready = isAnswered(question, value);
	const total = QUESTIONS.length;
	const textValue = typeof value === "string" ? value : "";
	const managerValue = parseManager(value);
	(0, import_react.useEffect)(() => {
		headingRef.current?.focus();
	}, [index]);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && ready) {
				e.preventDefault();
				next();
			}
			if (question.type === "scale" && [
				"1",
				"2",
				"3",
				"4",
				"5"
			].includes(e.key)) setAnswer(question.id, Number(e.key));
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		question,
		ready,
		next,
		setAnswer
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-36 pt-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "step-enter",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-medium tracking-widest text-muted uppercase",
					children: [
						String(index + 1).padStart(2, "0"),
						" / ",
						total,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-2 text-subtle",
							children: "·"
						}),
						question.section
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					ref: headingRef,
					tabIndex: -1,
					className: "mt-4 font-display text-2xl font-medium leading-snug tracking-tight text-fg outline-none sm:text-3xl",
					children: question.title
				}),
				question.helper ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: question.helper
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [
						question.type === "single" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceList, {
							options: question.options,
							value: typeof value === "string" ? value : void 0,
							onChange: (v) => setAnswer(question.id, v)
						}) : null,
						question.type === "multi" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceList, {
							options: question.options,
							multi: true,
							max: question.max,
							value: Array.isArray(value) ? value : [],
							onChange: (v) => setAnswer(question.id, v)
						}) : null,
						question.type === "scale" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, {
							value: typeof value === "number" ? value : void 0,
							minLabel: question.minLabel,
							maxLabel: question.maxLabel,
							onChange: (n) => setAnswer(question.id, n)
						}) : null,
						question.type === "text" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: textValue,
							rows: question.rows ?? 4,
							placeholder: question.placeholder,
							maxLength: 2e3,
							onChange: (e) => setAnswer(question.id, e.target.value)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex justify-between text-xs text-subtle",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: question.optional ? "Optional" : `${question.minChars ?? 1}+ characters` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: textValue.trim().length
							})]
						})] }) : null,
						question.type === "manager_pair" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagerPair, {
							name: question.title,
							value: managerValue,
							onChange: (nextValue) => setAnswer(question.id, nextValue)
						}) : null
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-x-0 bottom-0 z-10 border-t border-border/70 bg-bg/95 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-lg items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "icon",
						onClick: back,
						"aria-label": "Back",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
					}),
					question.type === "manager_pair" && !managerValue.skipped ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						onClick: () => setAnswer(question.id, {
							...EMPTY_MANAGER,
							skipped: true
						}),
						children: "Skip"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						className: "min-h-12 flex-1",
						disabled: !ready,
						onClick: next,
						children: [index === total - 1 ? question.type === "text" && question.optional && !textValue.trim() ? "Skip and review" : "Review" : "Continue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				]
			})
		})]
	});
}
function Review() {
	const answers = useSurvey((s) => s.answers);
	const back = useSurvey((s) => s.back);
	const markSubmitted = useSurvey((s) => s.markSubmitted);
	const [sending, setSending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function submit() {
		setSending(true);
		setError(null);
		try {
			await submitSurvey({ data: { answers } });
			markSubmitted();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not send. Try again.");
			setSending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-36 pt-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "step-enter",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-widest text-muted uppercase",
					children: "Review"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-3xl font-medium tracking-tight text-fg",
					children: "Submit your responses"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: "Your name is not collected. Manager notes go to password-protected results only."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 max-h-96 space-y-3 overflow-y-auto pr-1",
					children: QUESTIONS.map((q) => {
						const summary = summarizeAnswer(q, answers[q.id]);
						if (!summary) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-surface px-4 py-3 shadow-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium tracking-wide text-muted",
									children: q.section
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm font-medium text-fg",
									children: q.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 whitespace-pre-line text-sm leading-relaxed text-muted",
									children: summary
								})
							]
						}, q.id);
					})
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 rounded-md bg-surface-2 px-3 py-2 text-sm text-fg",
					role: "alert",
					children: error
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-x-0 bottom-0 z-10 border-t border-border/70 bg-bg/95 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-lg items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					size: "icon",
					onClick: back,
					"aria-label": "Back",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					className: "min-h-12 flex-1",
					disabled: sending,
					onClick: submit,
					children: sending ? "Sending…" : "Submit anonymous responses"
				})]
			})
		})]
	});
}
function Thanks() {
	const reset = useSurvey((s) => s.reset);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-10 pt-16 sm:pt-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "step-enter flex flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatioLogo, {
					size: "md",
					className: "self-center"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-10 font-display text-4xl font-medium tracking-tight text-fg",
					children: "Received."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-base leading-relaxed text-muted",
					children: "Your responses are recorded with no name attached. Results are locked for managers. If someone else needs this device, start a new survey."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-auto flex flex-col gap-3 pt-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						className: "w-full",
						onClick: reset,
						children: "Leave another response"
					})
				})
			]
		})
	});
}
function SurveyApp() {
	const screen = useSurvey((s) => s.screen);
	const index = useSurvey((s) => s.index);
	const submitted = useSurvey((s) => s.submitted);
	const progress = screen === "thanks" ? 100 : screen === "welcome" ? 0 : Math.round((index + 1) / Math.max(QUESTIONS.length, 1) * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-dvh flex-col bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 top-0 h-1 bg-surface-2",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-primary transition-[width] duration-200 ease-out",
					style: { width: `${progress}%` }
				})
			}),
			screen === "welcome" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Welcome, {}) : null,
			screen === "question" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionStep, {}, index) : null,
			screen === "thanks" ? submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thanks, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Review, {}) : null
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurveyApp, {});
}
//#endregion
export { Home as component };
