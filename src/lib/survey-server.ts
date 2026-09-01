import { createHash, timingSafeEqual } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import {
  HABITS,
  MANAGERS,
  NEED_OPTIONS,
  QUOTE_FIELDS,
  ROLE_OPTIONS,
  SLOWS_OPTIONS,
  answersComplete,
  habitLabel,
  parseManager,
  roleLabel,
  sanitizeAnswers,
  type Answers,
  type Choice,
  type HabitId,
} from "@/lib/survey";

const RESULTS_PASSWORD = "thepatio";

function passwordMatches(input: string): boolean {
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(RESULTS_PASSWORD).digest();
  return timingSafeEqual(a, b);
}

type ResponseRow = { id: number; answers: string };

function parseRow(row: ResponseRow): { id: number; answers: Answers } {
  try {
    return { id: row.id, answers: sanitizeAnswers(JSON.parse(row.answers)) };
  } catch {
    return { id: row.id, answers: {} };
  }
}

export const submitSurvey = createServerFn({ method: "POST" })
  .validator((data) => z.object({ answers: z.record(z.string(), z.unknown()) }).parse(data))
  .handler(async ({ data }) => {
    const answers = sanitizeAnswers(data.answers);
    if (!answersComplete(answers)) {
      throw new Error("Some answers are missing. Go back and finish, then submit.");
    }
    const sql = await getSql();
    await sql`
      insert into foh_responses (answers)
      values (${JSON.stringify(answers)})
    `;
    return { ok: true as const };
  });

export type CountItem = { id: string; label: string; count: number };

export type Quote = { id: string; field: string; role: string; text: string };

export type ManagerScore = {
  id: string;
  overall: number | null;
  responses: number;
  habits: { id: HabitId; label: string; avg: number | null }[];
};

export type PulseSummary = {
  total: number;
  averages: {
    week_setup: number | null;
    team_back: number | null;
    mgmt_heard: number | null;
  };
  roles: CountItem[];
  slows: CountItem[];
  needs: CountItem[];
  managerQuotes: Quote[];
  managerScores: ManagerScore[];
  quotes: Quote[];
};

function avgScale(rows: { answers: Answers }[], key: string): number | null {
  const nums = rows
    .map((r) => r.answers[key])
    .filter((n): n is number => typeof n === "number" && n >= 1 && n <= 5);
  if (!nums.length) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function countChoice(
  rows: { answers: Answers }[],
  key: string,
  options: Choice[],
  multi = false,
): CountItem[] {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const value = row.answers[key];
    const ids = multi
      ? Array.isArray(value)
        ? value.map(String)
        : []
      : typeof value === "string"
        ? [value]
        : [];
    for (const id of ids) {
      counts.set(id, (counts.get(id) ?? 0) + 1);
    }
  }
  return options
    .map((opt) => ({ id: opt.id, label: opt.label, count: counts.get(opt.id) ?? 0 }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function buildSummary(rows: { id: number; answers: Answers }[]): PulseSummary {
  const managerScores: ManagerScore[] = MANAGERS.map((manager) => {
    const notes = rows
      .map((r) => parseManager(r.answers[`mgr_${manager.id}`]))
      .filter((n) => !n.skipped);
    const rated = notes.filter((n) =>
      HABITS.every((h) => typeof n.habits[h.id] === "number"),
    );
    const habits = HABITS.map((habit) => {
      const nums = rated
        .map((n) => n.habits[habit.id])
        .filter((n): n is number => typeof n === "number");
      return {
        id: habit.id,
        label: habitLabel(habit.id),
        avg: nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : null,
      };
    });
    const overallNums = rated
      .map((n) => {
        const vals = HABITS.map((h) => n.habits[h.id]).filter(
          (x): x is number => typeof x === "number",
        );
        if (!vals.length) return null;
        return vals.reduce((a, b) => a + b, 0) / vals.length;
      })
      .filter((n): n is number => n != null);
    return {
      id: manager.id,
      overall: overallNums.length
        ? overallNums.reduce((a, b) => a + b, 0) / overallNums.length
        : null,
      responses: rated.length,
      habits,
    };
  });

  const managerQuotes: Quote[] = [];
  const quotes: Quote[] = [];
  for (const row of rows) {
    const role = roleLabel(row.answers.role);
    for (const manager of MANAGERS) {
      const note = parseManager(row.answers[`mgr_${manager.id}`]);
      if (note.skipped) continue;
      const strength = note.strength.trim();
      const weakness = note.weakness.trim();
      if (strength) {
        managerQuotes.push({
          id: String(row.id),
          field: `${manager.label} — strength`,
          role,
          text: strength,
        });
      }
      if (weakness) {
        managerQuotes.push({
          id: String(row.id),
          field: `${manager.label} — weakness`,
          role,
          text: weakness,
        });
      }
    }
    for (const field of QUOTE_FIELDS) {
      const text = row.answers[field.id];
      if (typeof text === "string" && text.trim()) {
        quotes.push({
          id: String(row.id),
          field: field.field,
          role,
          text: text.trim(),
        });
      }
    }
  }

  return {
    total: rows.length,
    averages: {
      week_setup: avgScale(rows, "week_setup"),
      team_back: avgScale(rows, "team_back"),
      mgmt_heard: avgScale(rows, "mgmt_heard"),
    },
    roles: countChoice(rows, "role", ROLE_OPTIONS),
    slows: countChoice(rows, "slows", SLOWS_OPTIONS),
    needs: countChoice(rows, "mgmt_need", NEED_OPTIONS, true),
    managerQuotes,
    managerScores,
    quotes,
  };
}

export const getResults = createServerFn({ method: "POST" })
  .validator((data) => z.object({ password: z.string().min(1).max(200) }).parse(data))
  .handler(async ({ data }): Promise<{ ok: true; summary: PulseSummary } | { ok: false; error: string }> => {
    if (!passwordMatches(data.password)) {
      return { ok: false, error: "Wrong password." };
    }
    const sql = await getSql();
    const rows = await sql<ResponseRow>`
      select id, answers from foh_responses order by created_at desc limit 500
    `;
    return { ok: true, summary: buildSummary(rows.map(parseRow)) };
  });
