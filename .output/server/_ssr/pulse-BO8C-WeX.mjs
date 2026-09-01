import { o as __toESM } from "../_runtime.mjs";
import { r as MANAGERS } from "./survey-Da1vCcTb.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as getResults, t as Button } from "./survey-server-CzyynG8m.mjs";
import { i as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pulse-BO8C-WeX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function fmt(n) {
	return n == null ? "—" : n.toFixed(1);
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface px-4 py-4 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-3xl font-medium tabular-nums tracking-tight text-fg",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs font-medium text-subtle",
				children: hint
			}) : null
		]
	});
}
function Bars({ title, items, total }) {
	const max = Math.max(1, ...items.map((i) => i.count));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-medium tracking-tight text-fg",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-4 space-y-3",
			children: [items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 text-fg",
					children: item.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 tabular-nums text-muted",
					children: item.count
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-primary",
					style: { width: `${Math.round(item.count / max * 100)}%` }
				})
			})] }, item.id)), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "text-sm text-muted",
				children: "Nothing in yet."
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "sr-only",
			children: [total, " total responses in this group"]
		})
	] });
}
function QuoteColumn({ title, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs font-medium tracking-widest text-muted uppercase",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 space-y-3",
		children: items.length ? items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-lg bg-surface px-5 py-4 shadow-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-muted",
				children: item.role
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-fg",
				children: item.text
			})]
		}, `${item.id}-${item.field}-${i}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-lg bg-surface px-5 py-4 text-sm text-muted shadow-card",
			children: "None yet."
		})
	})] });
}
function ManagerBlock({ quotes, scores }) {
	const rows = MANAGERS.map((manager) => ({
		manager,
		card: scores.find((s) => s.id === manager.id),
		strengths: quotes.filter((q) => q.field === `${manager.label} — strength`),
		weaknesses: quotes.filter((q) => q.field === `${manager.label} — weakness`)
	})).filter((r) => r.card && r.card.responses > 0 || r.strengths.length > 0 || r.weaknesses.length > 0);
	if (!rows.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-display text-2xl font-medium tracking-tight text-fg",
		children: "How managers run the store"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6 space-y-10",
		children: rows.map(({ manager, card, strengths, weaknesses }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl font-medium tracking-tight text-fg",
					children: manager.label
				}), card && card.overall != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Overall",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium tabular-nums text-fg",
							children: fmt(card.overall)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-subtle",
							children: " / 5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-1.5 text-subtle",
							children: "·"
						}),
						card.responses,
						" ",
						card.responses === 1 ? "rating" : "ratings"
					]
				}) : null]
			}),
			card && card.habits.some((h) => h.avg != null) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2.5",
				children: card.habits.map((habit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 text-fg",
						children: habit.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 tabular-nums text-muted",
						children: fmt(habit.avg)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-primary",
						style: { width: `${habit.avg ? Math.round(habit.avg / 5 * 100) : 0}%` }
					})
				})] }, habit.id))
			}) : null,
			strengths.length || weaknesses.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteColumn, {
					title: "Strengths",
					items: strengths
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteColumn, {
					title: "Weaknesses",
					items: weaknesses
				})]
			}) : null
		] }, manager.id))
	})] });
}
function WordCard({ quote }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mb-4 break-inside-avoid rounded-lg bg-surface px-5 py-4 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs font-medium tracking-wide text-muted",
			children: [
				quote.role,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-1.5 text-subtle",
					children: "·"
				}),
				quote.field
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-fg",
			children: quote.text
		})]
	});
}
function Empty() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-12 rounded-xl bg-surface px-6 py-12 text-center shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl font-medium text-fg",
				children: "No responses yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted",
				children: "The first response will appear here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-6 inline-flex h-12 items-center justify-center rounded-md bg-ink px-5 text-sm font-medium text-ink-fg shadow-card transition-transform duration-150 active:scale-[0.96]",
				children: "Leave a response"
			})
		]
	});
}
function Dashboard({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-10 space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Notes",
						value: String(data.total)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Station stocked",
						value: fmt(data.averages.week_setup),
						hint: "of 5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Team steps in",
						value: fmt(data.averages.team_back),
						hint: "of 5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Managers address it",
						value: fmt(data.averages.mgmt_heard),
						hint: "of 5"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, {
					title: "Positions",
					items: data.roles,
					total: data.total
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, {
					title: "What slows a shift",
					items: data.slows,
					total: data.total
				})]
			}),
			data.needs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, {
				title: "What people need from managers",
				items: data.needs,
				total: Math.max(1, data.needs.reduce((sum, item) => sum + item.count, 0))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagerBlock, {
				quotes: data.managerQuotes,
				scores: data.managerScores
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-medium tracking-tight text-fg",
				children: "In their words"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 columns-1 gap-4 sm:columns-2",
				children: data.quotes.map((quote, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordCard, { quote }, `${quote.id}-${quote.field}-${i}`))
			})] })
		]
	});
}
function ResultsPage() {
	const [password, setPassword] = (0, import_react.useState)("");
	const [summary, setSummary] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [checking, setChecking] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setChecking(true);
		setError(null);
		try {
			const result = await getResults({ data: { password } });
			if (!result.ok) {
				setError(result.error);
				return;
			}
			setSummary(result.summary);
			setPassword("");
		} catch {
			setError("Could not open results.");
		} finally {
			setChecking(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "mx-auto flex w-full max-w-3xl items-center px-5 pt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex h-11 items-center gap-2 text-sm font-medium text-muted transition-colors duration-150 hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back to survey"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-3xl px-5 pb-16 pt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-widest text-muted uppercase",
					children: "Manager results"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl font-medium tracking-tight text-fg",
					children: "Front of house pulse"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-base leading-relaxed text-muted",
					children: summary ? "Scores are averages. Written answers are unedited." : "Password required. Scores are averages. Written answers are unedited."
				}),
				summary ? summary.total === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, { data: summary }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "mt-10 max-w-sm rounded-xl bg-surface px-5 py-6 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "results-password",
							className: "text-sm font-medium text-fg",
							children: "Password"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "results-password",
							name: "results-password",
							type: "password",
							autoComplete: "current-password",
							autoFocus: true,
							value: password,
							onChange: (e) => {
								setPassword(e.target.value);
								if (error) setError(null);
							},
							className: "mt-2 h-12 w-full rounded-md bg-bg px-4 text-base text-fg shadow-card placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 rounded-md bg-surface-2 px-3 py-2 text-sm text-fg",
							role: "alert",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "mt-5 w-full",
							disabled: checking || password.length === 0,
							children: checking ? "Checking…" : "Open results"
						})
					]
				})
			]
		})]
	});
}
function PulsePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsPage, {});
}
//#endregion
export { PulsePage as component };
