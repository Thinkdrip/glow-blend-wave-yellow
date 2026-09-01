import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PatioLogo } from "@/components/logo";
import { ChoiceList, ManagerPair, Scale } from "@/components/fields";
import { useSurvey } from "@/components/survey-store";
import { submitSurvey } from "@/lib/survey-server";
import {
  EMPTY_MANAGER,
  QUESTIONS,
  isAnswered,
  parseManager,
  summarizeAnswer,
} from "@/lib/survey";

function Bullet({ children }: { children: string }) {
  return (
    <li className="flex gap-3">
      <span
        className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
        aria-hidden="true"
      />
      <span>{children}</span>
    </li>
  );
}

function Welcome() {
  const start = useSurvey((s) => s.start);
  const resume = useSurvey((s) => s.resume);
  const hasDraft = useSurvey((s) => s.hasDraft());
  const submitted = useSurvey((s) => s.submitted);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const showResume = hydrated && hasDraft && !submitted;

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-10 pt-16 sm:pt-24">
      <div className="step-enter flex flex-1 flex-col">
        <PatioLogo size="lg" className="self-center" />
        <p className="mt-8 font-display text-3xl font-medium leading-tight tracking-tight text-fg sm:text-4xl">
          Front of house feedback
        </p>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          For floor, register, drive thru, bagging, window, and FOH management.
          Your name is not collected. Answer based on the last 3 months.
        </p>
        <ul className="mt-8 space-y-3 text-sm text-muted">
          <Bullet>Cover the last 3 months of shifts.</Bullet>
          <Bullet>
            You will rate how each manager runs the store, then add a strength
            and a weakness if you have more to say.
          </Bullet>
          <Bullet>If this device is shared, submit, then start over.</Bullet>
        </ul>
        <div className="mt-auto flex flex-col gap-3 pt-12">
          {showResume ? (
            <Button size="lg" onClick={resume} className="w-full">
              Continue where you left off
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button size="lg" onClick={start} className="w-full">
              Start
              <ArrowRight className="size-4" />
            </Button>
          )}
          {showResume ? (
            <Button size="lg" variant="outline" onClick={start} className="w-full">
              Start over
            </Button>
          ) : null}
          <Link
            to="/pulse"
            className="mt-1 inline-flex h-11 items-center justify-center text-sm font-medium text-muted transition-colors duration-150 hover:text-fg"
          >
            Manager results
          </Link>
        </div>
      </div>
    </main>
  );
}

function QuestionStep() {
  const index = useSurvey((s) => s.index);
  const answers = useSurvey((s) => s.answers);
  const setAnswer = useSurvey((s) => s.setAnswer);
  const next = useSurvey((s) => s.next);
  const back = useSurvey((s) => s.back);
  const question = QUESTIONS[Math.min(index, QUESTIONS.length - 1)]!;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const value = answers[question.id];
  const ready = isAnswered(question, value);
  const total = QUESTIONS.length;
  const textValue = typeof value === "string" ? value : "";
  const managerValue = parseManager(value);

  useEffect(() => {
    headingRef.current?.focus();
  }, [index]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && ready) {
        e.preventDefault();
        next();
      }
      if (question.type === "scale" && ["1", "2", "3", "4", "5"].includes(e.key)) {
        setAnswer(question.id, Number(e.key));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [question, ready, next, setAnswer]);

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-36 pt-12">
      <div className="step-enter">
        <p className="text-xs font-medium tracking-widest text-muted uppercase">
          {String(index + 1).padStart(2, "0")} / {total}
          <span className="mx-2 text-subtle">·</span>
          {question.section}
        </p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-4 font-display text-2xl font-medium leading-snug tracking-tight text-fg outline-none sm:text-3xl"
        >
          {question.title}
        </h1>
        {question.helper ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {question.helper}
          </p>
        ) : null}
        <div className="mt-8">
          {question.type === "single" ? (
            <ChoiceList
              options={question.options}
              value={typeof value === "string" ? value : undefined}
              onChange={(v) => setAnswer(question.id, v)}
            />
          ) : null}
          {question.type === "multi" ? (
            <ChoiceList
              options={question.options}
              multi
              max={question.max}
              value={Array.isArray(value) ? (value as string[]) : []}
              onChange={(v) => setAnswer(question.id, v)}
            />
          ) : null}
          {question.type === "scale" ? (
            <Scale
              value={typeof value === "number" ? value : undefined}
              minLabel={question.minLabel}
              maxLabel={question.maxLabel}
              onChange={(n) => setAnswer(question.id, n)}
            />
          ) : null}
          {question.type === "text" ? (
            <div>
              <Textarea
                value={textValue}
                rows={question.rows ?? 4}
                placeholder={question.placeholder}
                maxLength={2000}
                onChange={(e) => setAnswer(question.id, e.target.value)}
              />
              <div className="mt-2 flex justify-between text-xs text-subtle">
                <span>
                  {question.optional ? "Optional" : `${question.minChars ?? 1}+ characters`}
                </span>
                <span className="tabular-nums">{textValue.trim().length}</span>
              </div>
            </div>
          ) : null}
          {question.type === "manager_pair" ? (
            <ManagerPair
              name={question.title}
              value={managerValue}
              onChange={(nextValue) => setAnswer(question.id, nextValue)}
            />
          ) : null}
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-border/70 bg-bg/95 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={back}
            aria-label="Back"
          >
            <ArrowLeft className="size-4" />
          </Button>
          {question.type === "manager_pair" && !managerValue.skipped ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setAnswer(question.id, { ...EMPTY_MANAGER, skipped: true })}
            >
              Skip
            </Button>
          ) : null}
          <Button
            type="button"
            className="min-h-12 flex-1"
            disabled={!ready}
            onClick={next}
          >
            {index === total - 1
              ? question.type === "text" && question.optional && !textValue.trim()
                ? "Skip and review"
                : "Review"
              : "Continue"}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}

function Review() {
  const answers = useSurvey((s) => s.answers);
  const back = useSurvey((s) => s.back);
  const markSubmitted = useSurvey((s) => s.markSubmitted);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-36 pt-12">
      <div className="step-enter">
        <p className="text-xs font-medium tracking-widest text-muted uppercase">
          Review
        </p>
        <h1 className="mt-4 font-display text-3xl font-medium tracking-tight text-fg">
          Submit your responses
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Your name is not collected. Manager notes go to password-protected
          results only.
        </p>
        <div className="mt-8 max-h-96 space-y-3 overflow-y-auto pr-1">
          {QUESTIONS.map((q) => {
            const summary = summarizeAnswer(q, answers[q.id]);
            if (!summary) return null;
            return (
              <div key={q.id} className="rounded-lg bg-surface px-4 py-3 shadow-card">
                <p className="text-xs font-medium tracking-wide text-muted">
                  {q.section}
                </p>
                <p className="mt-1 text-sm font-medium text-fg">{q.title}</p>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted">
                  {summary}
                </p>
              </div>
            );
          })}
        </div>
        {error ? (
          <p className="mt-4 rounded-md bg-surface-2 px-3 py-2 text-sm text-fg" role="alert">
            {error}
          </p>
        ) : null}
      </div>
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-border/70 bg-bg/95 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={back}
            aria-label="Back"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <Button
            type="button"
            className="min-h-12 flex-1"
            disabled={sending}
            onClick={submit}
          >
            {sending ? "Sending…" : "Submit anonymous responses"}
          </Button>
        </div>
      </div>
    </main>
  );
}

function Thanks() {
  const reset = useSurvey((s) => s.reset);
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-10 pt-16 sm:pt-24">
      <div className="step-enter flex flex-1 flex-col">
        <PatioLogo size="md" className="self-center" />
        <h1 className="mt-10 font-display text-4xl font-medium tracking-tight text-fg">
          Received.
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          Your responses are recorded with no name attached. Results are locked
          for managers. If someone else needs this device, start a new survey.
        </p>
        <div className="mt-auto flex flex-col gap-3 pt-12">
          <Button size="lg" className="w-full" onClick={reset}>
            Leave another response
          </Button>
        </div>
      </div>
    </main>
  );
}

export function SurveyApp() {
  const screen = useSurvey((s) => s.screen);
  const index = useSurvey((s) => s.index);
  const submitted = useSurvey((s) => s.submitted);
  const progress =
    screen === "thanks"
      ? 100
      : screen === "welcome"
        ? 0
        : Math.round(((index + 1) / Math.max(QUESTIONS.length, 1)) * 100);

  return (
    <div className="relative flex min-h-dvh flex-col bg-bg">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-surface-2"
        aria-hidden="true"
      >
        <div
          className="h-full bg-primary transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {screen === "welcome" ? <Welcome /> : null}
      {screen === "question" ? <QuestionStep key={index} /> : null}
      {screen === "thanks" ? (submitted ? <Thanks /> : <Review />) : null}
    </div>
  );
}
