import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  EMPTY_MANAGER,
  HABITS,
  type Choice,
  type HabitId,
  type ManagerNote,
} from "@/lib/survey";

export function ChoiceList({
  options,
  value,
  multi = false,
  max,
  onChange,
}: {
  options: Choice[];
  value: string | string[] | undefined;
  multi?: boolean;
  max?: number;
  onChange: (next: string | string[]) => void;
}) {
  const selected = new Set(Array.isArray(value) ? value : value ? [value] : []);

  function toggle(id: string) {
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

  return (
    <div role={multi ? "group" : "radiogroup"} className="flex flex-col gap-2">
      {options.map((option) => {
        const on = selected.has(option.id);
        return (
          <button
            key={option.id}
            type="button"
            role={multi ? "checkbox" : "radio"}
            aria-checked={on}
            onClick={() => toggle(option.id)}
            className={cn(
              "flex min-h-12 w-full items-center gap-3 rounded-md bg-surface px-4 py-3.5 text-left shadow-card",
              "transition-[transform,box-shadow,background-color] duration-150 ease-out",
              "hover:shadow-card-hover",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              "active:scale-[0.99]",
              on && "bg-primary/10 shadow-card-hover",
            )}
          >
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center border border-border",
                multi ? "rounded-sm" : "rounded-full",
                on ? "border-primary bg-primary text-primary-fg" : "bg-surface",
              )}
            >
              {on ? <Check className="size-3" strokeWidth={3} /> : null}
            </span>
            <span className="text-sm font-medium leading-snug text-fg">
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const SCALE = [1, 2, 3, 4, 5];

export function Scale({
  value,
  minLabel,
  maxLabel,
  onChange,
}: {
  value: number | undefined;
  minLabel: string;
  maxLabel: string;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div
        role="radiogroup"
        className="grid grid-cols-5 gap-2"
        aria-label="Rating from 1 to 5"
      >
        {SCALE.map((n) => {
          const on = value === n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={on}
              aria-label={`${n} of 5`}
              onClick={() => onChange(n)}
              className={cn(
                "flex h-14 items-center justify-center rounded-md font-sans text-lg font-semibold tabular-nums shadow-card",
                "transition-[transform,background-color,color,box-shadow] duration-150 ease-out",
                "hover:shadow-card-hover",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                "active:scale-[0.96]",
                on ? "bg-ink text-ink-fg" : "bg-surface text-fg",
              )}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-start justify-between gap-4 text-xs font-medium tracking-wide text-muted">
        <span className="flex-1">{minLabel}</span>
        <span className="flex-1 text-right">{maxLabel}</span>
      </div>
    </div>
  );
}

function HabitRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | undefined;
  onChange: (n: number) => void;
}) {
  return (
    <div className="rounded-lg bg-surface px-4 py-3 shadow-card">
      <p className="text-sm font-medium leading-snug text-fg">{label}</p>
      <div
        role="radiogroup"
        aria-label={label}
        className="mt-2.5 grid grid-cols-5 gap-1.5"
      >
        {SCALE.map((n) => {
          const on = value === n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={on}
              aria-label={`${n} of 5`}
              onClick={() => onChange(n)}
              className={cn(
                "flex h-11 items-center justify-center rounded-md font-sans text-sm font-semibold tabular-nums",
                "transition-[transform,background-color,color] duration-150 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                "active:scale-[0.96]",
                on ? "bg-ink text-ink-fg" : "bg-bg text-fg shadow-card",
              )}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ManagerPair({
  name,
  value,
  onChange,
}: {
  name: string;
  value: ManagerNote;
  onChange: (next: ManagerNote) => void;
}) {
  function setHabit(habitId: HabitId, n: number) {
    onChange({
      ...value,
      skipped: false,
      habits: { ...value.habits, [habitId]: n },
    });
  }

  if (value.skipped) {
    return (
      <div className="rounded-lg bg-surface px-5 py-6 shadow-card">
        <p className="text-sm leading-relaxed text-muted">
          You have not worked with {name} in the last 3 months.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-5"
          onClick={() => onChange({ ...EMPTY_MANAGER })}
        >
          I have worked with {name}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium text-fg">
          How well does {name} manage the store?
        </p>
        <p className="mt-1 text-xs font-medium text-subtle">
          1 rarely · 5 consistently
        </p>
        <div className="mt-4 flex flex-col gap-3">
          {HABITS.map((habit) => (
            <HabitRow
              key={habit.id}
              label={habit.label}
              value={value.habits[habit.id]}
              onChange={(n) => setHabit(habit.id, n)}
            />
          ))}
        </div>
      </div>
      <div>
        <label
          htmlFor={`strength-${name}`}
          className="mb-2 block text-sm font-medium text-fg"
        >
          {name}’s greatest strength as a manager
        </label>
        <Textarea
          id={`strength-${name}`}
          value={value.strength}
          rows={3}
          placeholder="Optional — what they do well…"
          maxLength={2000}
          className="min-h-24"
          onChange={(e) =>
            onChange({ ...value, skipped: false, strength: e.target.value })
          }
        />
        <div className="mt-2 flex justify-between text-xs text-subtle">
          <span>Optional</span>
          <span className="tabular-nums">{value.strength.trim().length}</span>
        </div>
      </div>
      <div>
        <label
          htmlFor={`weakness-${name}`}
          className="mb-2 block text-sm font-medium text-fg"
        >
          {name}’s greatest weakness as a manager
        </label>
        <Textarea
          id={`weakness-${name}`}
          value={value.weakness}
          rows={3}
          placeholder="Optional — what needs to change…"
          maxLength={2000}
          className="min-h-24"
          onChange={(e) =>
            onChange({ ...value, skipped: false, weakness: e.target.value })
          }
        />
        <div className="mt-2 flex justify-between text-xs text-subtle">
          <span>Optional</span>
          <span className="tabular-nums">{value.weakness.trim().length}</span>
        </div>
      </div>
    </div>
  );
}
