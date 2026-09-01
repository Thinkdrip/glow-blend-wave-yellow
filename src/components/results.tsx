import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getResults, type PulseSummary, type Quote } from "@/lib/survey-server";
import { MANAGERS } from "@/lib/survey";

function fmt(n: number | null | undefined): string {
  return n == null ? "—" : n.toFixed(1);
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg bg-surface px-4 py-4 shadow-card">
      <p className="text-xs font-medium tracking-wide text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-medium tabular-nums tracking-tight text-fg">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs font-medium text-subtle">{hint}</p>
      ) : null}
    </div>
  );
}

function Bars({
  title,
  items,
  total,
}: {
  title: string;
  items: { id: string; label: string; count: number }[];
  total: number;
}) {
  const max = Math.max(1, ...items.map((i) => i.count));
  return (
    <section>
      <h2 className="font-display text-xl font-medium tracking-tight text-fg">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="min-w-0 text-fg">{item.label}</span>
              <span className="shrink-0 tabular-nums text-muted">{item.count}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.round((item.count / max) * 100)}%` }}
              />
            </div>
          </li>
        ))}
        {items.length === 0 ? (
          <li className="text-sm text-muted">Nothing in yet.</li>
        ) : null}
      </ul>
      <p className="sr-only">{total} total responses in this group</p>
    </section>
  );
}

function QuoteColumn({ title, items }: { title: string; items: Quote[] }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-widest text-muted uppercase">
        {title}
      </p>
      <div className="mt-3 space-y-3">
        {items.length ? (
          items.map((item, i) => (
            <article
              key={`${item.id}-${item.field}-${i}`}
              className="rounded-lg bg-surface px-5 py-4 shadow-card"
            >
              <p className="text-xs font-medium tracking-wide text-muted">
                {item.role}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-fg">{item.text}</p>
            </article>
          ))
        ) : (
          <p className="rounded-lg bg-surface px-5 py-4 text-sm text-muted shadow-card">
            None yet.
          </p>
        )}
      </div>
    </div>
  );
}

function ManagerBlock({
  quotes,
  scores,
}: {
  quotes: Quote[];
  scores: PulseSummary["managerScores"];
}) {
  const rows = MANAGERS.map((manager) => ({
    manager,
    card: scores.find((s) => s.id === manager.id),
    strengths: quotes.filter((q) => q.field === `${manager.label} — strength`),
    weaknesses: quotes.filter((q) => q.field === `${manager.label} — weakness`),
  })).filter(
    (r) =>
      (r.card && r.card.responses > 0) ||
      r.strengths.length > 0 ||
      r.weaknesses.length > 0,
  );

  if (!rows.length) return null;

  return (
    <section>
      <h2 className="font-display text-2xl font-medium tracking-tight text-fg">
        How managers run the store
      </h2>
      <div className="mt-6 space-y-10">
        {rows.map(({ manager, card, strengths, weaknesses }) => (
          <div key={manager.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-display text-xl font-medium tracking-tight text-fg">
                {manager.label}
              </h3>
              {card && card.overall != null ? (
                <p className="text-sm text-muted">
                  Overall{" "}
                  <span className="font-medium tabular-nums text-fg">
                    {fmt(card.overall)}
                  </span>
                  <span className="text-subtle"> / 5</span>
                  <span className="mx-1.5 text-subtle">·</span>
                  {card.responses} {card.responses === 1 ? "rating" : "ratings"}
                </p>
              ) : null}
            </div>
            {card && card.habits.some((h) => h.avg != null) ? (
              <ul className="mt-4 space-y-2.5">
                {card.habits.map((habit) => (
                  <li key={habit.id}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="min-w-0 text-fg">{habit.label}</span>
                      <span className="shrink-0 tabular-nums text-muted">
                        {fmt(habit.avg)}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${habit.avg ? Math.round((habit.avg / 5) * 100) : 0}%`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
            {strengths.length || weaknesses.length ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <QuoteColumn title="Strengths" items={strengths} />
                <QuoteColumn title="Weaknesses" items={weaknesses} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function WordCard({ quote }: { quote: Quote }) {
  return (
    <article className="mb-4 break-inside-avoid rounded-lg bg-surface px-5 py-4 shadow-card">
      <p className="text-xs font-medium tracking-wide text-muted">
        {quote.role}
        <span className="mx-1.5 text-subtle">·</span>
        {quote.field}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-fg">{quote.text}</p>
    </article>
  );
}

function Empty() {
  return (
    <div className="mt-12 rounded-xl bg-surface px-6 py-12 text-center shadow-card">
      <p className="font-display text-2xl font-medium text-fg">No responses yet.</p>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
        The first response will appear here.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-ink px-5 text-sm font-medium text-ink-fg shadow-card transition-transform duration-150 active:scale-[0.96]"
      >
        Leave a response
      </Link>
    </div>
  );
}

function Dashboard({ data }: { data: PulseSummary }) {
  return (
    <div className="mt-10 space-y-10">
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Notes" value={String(data.total)} />
        <Stat label="Station stocked" value={fmt(data.averages.week_setup)} hint="of 5" />
        <Stat label="Team steps in" value={fmt(data.averages.team_back)} hint="of 5" />
        <Stat
          label="Managers address it"
          value={fmt(data.averages.mgmt_heard)}
          hint="of 5"
        />
      </section>
      <div className="grid gap-8 sm:grid-cols-2">
        <Bars title="Positions" items={data.roles} total={data.total} />
        <Bars title="What slows a shift" items={data.slows} total={data.total} />
      </div>
      {data.needs.length ? (
        <Bars
          title="What people need from managers"
          items={data.needs}
          total={Math.max(
            1,
            data.needs.reduce((sum, item) => sum + item.count, 0),
          )}
        />
      ) : null}
      <ManagerBlock quotes={data.managerQuotes} scores={data.managerScores} />
      <section>
        <h2 className="font-display text-2xl font-medium tracking-tight text-fg">
          In their words
        </h2>
        <div className="mt-5 columns-1 gap-4 sm:columns-2">
          {data.quotes.map((quote, i) => (
            <WordCard key={`${quote.id}-${quote.field}-${i}`} quote={quote} />
          ))}
        </div>
      </section>
    </div>
  );
}

export function ResultsPage() {
  const [password, setPassword] = useState("");
  const [summary, setSummary] = useState<PulseSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  async function onSubmit(e: FormEvent) {
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

  return (
    <div className="min-h-dvh bg-bg">
      <header className="mx-auto flex w-full max-w-3xl items-center px-5 pt-6">
        <Link
          to="/"
          className="inline-flex h-11 items-center gap-2 text-sm font-medium text-muted transition-colors duration-150 hover:text-fg"
        >
          <ArrowLeft className="size-4" />
          Back to survey
        </Link>
      </header>
      <main className="mx-auto w-full max-w-3xl px-5 pb-16 pt-10">
        <p className="text-xs font-medium tracking-widest text-muted uppercase">
          Manager results
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-fg">
          Front of house pulse
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
          {summary
            ? "Scores are averages. Written answers are unedited."
            : "Password required. Scores are averages. Written answers are unedited."}
        </p>
        {summary ? (
          summary.total === 0 ? (
            <Empty />
          ) : (
            <Dashboard data={summary} />
          )
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-10 max-w-sm rounded-xl bg-surface px-5 py-6 shadow-card"
          >
            <label htmlFor="results-password" className="text-sm font-medium text-fg">
              Password
            </label>
            <input
              id="results-password"
              name="results-password"
              type="password"
              autoComplete="current-password"
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null);
              }}
              className="mt-2 h-12 w-full rounded-md bg-bg px-4 text-base text-fg shadow-card placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            />
            {error ? (
              <p className="mt-3 rounded-md bg-surface-2 px-3 py-2 text-sm text-fg" role="alert">
                {error}
              </p>
            ) : null}
            <Button
              type="submit"
              className="mt-5 w-full"
              disabled={checking || password.length === 0}
            >
              {checking ? "Checking…" : "Open results"}
            </Button>
          </form>
        )}
      </main>
    </div>
  );
}
