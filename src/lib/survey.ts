export const MANAGERS = [
  { id: "joe", label: "Joe" },
  { id: "john", label: "John" },
  { id: "brad", label: "Brad" },
  { id: "shannon", label: "Shannon" },
  { id: "jordan", label: "Jordan" },
  { id: "marc", label: "Marc" },
  { id: "brian", label: "Brian" },
] as const;

export type ManagerId = (typeof MANAGERS)[number]["id"];

export const HABITS = [
  { id: "calls", label: "Aware and attentive for manager calls" },
  { id: "complaints", label: "Helps when there are guest complaints" },
  { id: "backed_up", label: "Helps when the store gets backed up" },
  { id: "train", label: "Helps train people" },
  { id: "phone", label: "Answers the phone when everyone is busy" },
  { id: "cleaning", label: "Gives cleaning tasks and assists with them" },
  { id: "professional", label: "Acts professionally" },
  { id: "closing", label: "Checks positions at closing time" },
] as const;

export type HabitId = (typeof HABITS)[number]["id"];

export type Choice = { id: string; label: string };

export type Question =
  | {
      id: string;
      section: string;
      type: "single";
      title: string;
      helper?: string;
      options: Choice[];
    }
  | {
      id: string;
      section: string;
      type: "multi";
      title: string;
      helper?: string;
      options: Choice[];
      max: number;
    }
  | {
      id: string;
      section: string;
      type: "scale";
      title: string;
      helper?: string;
      minLabel: string;
      maxLabel: string;
    }
  | {
      id: string;
      section: string;
      type: "text";
      title: string;
      helper?: string;
      placeholder: string;
      rows?: number;
      minChars?: number;
      optional?: boolean;
    }
  | {
      id: string;
      section: "Managers";
      type: "manager_pair";
      managerId: ManagerId;
      title: string;
      helper: string;
    };

export type ManagerNote = {
  strength: string;
  weakness: string;
  skipped: boolean;
  habits: Partial<Record<HabitId, number>>;
};

export const EMPTY_MANAGER: ManagerNote = {
  strength: "",
  weakness: "",
  skipped: false,
  habits: {},
};

function managerQuestion(id: ManagerId, label: string): Question {
  return {
    id: `mgr_${id}`,
    section: "Managers",
    type: "manager_pair",
    managerId: id,
    title: label,
    helper:
      "Over the last 3 months, rate how they manage the store. 1 is rarely. 5 is consistently. Skip if you have not worked with this person.",
  };
}

export const ROLE_OPTIONS: Choice[] = [
  { id: "floor", label: "Floor" },
  { id: "register", label: "Register" },
  { id: "drive_thru", label: "Drive thru" },
  { id: "bagging", label: "Bagging (phone orders)" },
  { id: "window", label: "Window (expo)" },
  { id: "management", label: "Management" },
];

export const TENURE_OPTIONS: Choice[] = [
  { id: "under_1", label: "Less than 1 year" },
  { id: "y1_3", label: "1–3 years" },
  { id: "y3_5", label: "3–5 years" },
  { id: "y5_plus", label: "5 or more years" },
];

export const SLOWS_OPTIONS: Choice[] = [
  { id: "staffing", label: "Not enough people scheduled" },
  { id: "unstocked", label: "Station left unstocked by the previous shift" },
  { id: "split_line", label: "Drive-thru and counter competing for the same food" },
  { id: "expo", label: "Window / expo backing up" },
  { id: "running", label: "Floor running behind (tables, drinks, food sitting)" },
  { id: "gear", label: "Equipment (POS, printers, headsets, bag racks)" },
  { id: "assignments", label: "Unclear who owns which station" },
];

export const SLAMMED_OPTIONS: Choice[] = [
  { id: "counter", label: "Counter / register line" },
  { id: "drive", label: "Drive-thru times" },
  { id: "window", label: "Window / expo" },
  { id: "floor", label: "Floor running (tables and food delivery)" },
  { id: "talk", label: "Communication between stations" },
  { id: "stock", label: "Restocking during the rush" },
];

export const SCHEDULE_OPTIONS: Choice[] = [
  { id: "fair", label: "Enough notice, and hours are fair" },
  { id: "coverage", label: "Hours are acceptable; coverage is not" },
  { id: "late", label: "Changes come too late to plan around" },
  { id: "unreliable", label: "Unreliable — I cannot plan my week" },
];

export const NEED_OPTIONS: Choice[] = [
  { id: "present", label: "Present at the stations that are drowning during rush" },
  { id: "assignments", label: "Clear station assignments before the shift" },
  { id: "hands", label: "Help restocking and running food when we are short" },
  { id: "backing", label: "Backing on guest complaints" },
  { id: "training", label: "Training new people before they are left on a station" },
  { id: "answers", label: "Direct answers on schedule and coverage" },
  { id: "standard", label: "Holding every shift to leave stations stocked" },
];

export const QUOTE_FIELDS = [
  { id: "guest_notice", field: "Guests" },
  { id: "company_improve", field: "How FOH is run" },
  { id: "company_different", field: "From the company" },
  { id: "mgmt_different", field: "Management overall" },
  { id: "friday_fix", field: "This week" },
  { id: "anything_else", field: "Anything else" },
] as const;

export const QUESTIONS: Question[] = [
  {
    id: "role",
    section: "Your position",
    type: "single",
    title: "Which position do you work most?",
    helper:
      "The station you are assigned most often, not the one you cover when someone calls off.",
    options: ROLE_OPTIONS,
  },
  {
    id: "tenure",
    section: "Your position",
    type: "single",
    title: "How long have you worked at The Patio?",
    options: TENURE_OPTIONS,
  },
  {
    id: "week_setup",
    section: "The station",
    type: "scale",
    title:
      "Over the last 3 months, how often did you come into a stocked station from the previous shift?",
    helper:
      "Cups, lids, sauces, ice, bags, utensils, and a clean surface — ready to work without hunting or restocking first.",
    minLabel: "Rarely",
    maxLabel: "Almost always",
  },
  {
    id: "slows",
    section: "The station",
    type: "single",
    title:
      "Over the last 3 months, what most regularly slowed you down during a shift?",
    helper: "The pattern, not a one-time problem.",
    options: SLOWS_OPTIONS,
  },
  {
    id: "slammed",
    section: "The station",
    type: "multi",
    max: 2,
    title: "When volume is high, where does front of house break first?",
    helper: "Choose up to two. Think about the last 3 months.",
    options: SLAMMED_OPTIONS,
  },
  {
    id: "schedule",
    section: "Coverage",
    type: "single",
    title: "Over the last 3 months, how would you describe the schedule?",
    options: SCHEDULE_OPTIONS,
  },
  {
    id: "team_back",
    section: "Coverage",
    type: "scale",
    title:
      "Over the last 3 months, when an order is wrong, the window backs up, or a guest is upset, does the rest of front of house step in?",
    minLabel: "Rarely",
    maxLabel: "Consistently",
  },
  {
    id: "guest_notice",
    section: "Guests",
    type: "text",
    rows: 4,
    minChars: 8,
    title:
      "Over the last 3 months, what have guests experienced that we should be taking more seriously?",
    helper:
      "They order at the counter, sit down, and a floor runner brings the food. Think wait times, dirty tables, food sitting in the window, drive-thru vs. inside, drinks, or anything else they notice.",
    placeholder: "Guests experience…",
  },
  {
    id: "company_improve",
    section: "The company",
    type: "text",
    rows: 5,
    minChars: 12,
    title: "How would you improve how front of house is run?",
    helper:
      "Based on the last 3 months. Staffing, station standards, drive-thru vs. counter, training, equipment, or how we move food from window to table.",
    placeholder: "Front of house would run better if…",
  },
  {
    id: "company_different",
    section: "The company",
    type: "text",
    rows: 5,
    minChars: 12,
    title: "What do you want to see different from the company?",
    helper:
      "Pay, hours, how people are trained, how stations are staffed, equipment, or how decisions get made. Be specific.",
    placeholder: "From the company, I want…",
  },
  {
    id: "mgmt_heard",
    section: "Management",
    type: "scale",
    title:
      "Over the last 3 months, when you raise a problem with a manager, is it addressed?",
    minLabel: "Rarely",
    maxLabel: "Consistently",
  },
  {
    id: "mgmt_need",
    section: "Management",
    type: "multi",
    max: 3,
    title: "What do you need from management that you do not get enough of?",
    helper: "Choose up to three.",
    options: NEED_OPTIONS,
  },
  ...MANAGERS.map((m) => managerQuestion(m.id, m.label)),
  {
    id: "mgmt_different",
    section: "Management",
    type: "text",
    rows: 5,
    minChars: 12,
    title:
      "Aside from the people above, what would you want different from management overall?",
    helper:
      "Systems, communication, coverage, training — not a repeat of one person's notes.",
    placeholder: "Overall, I need management to…",
  },
  {
    id: "friday_fix",
    section: "Operations",
    type: "text",
    rows: 5,
    minChars: 12,
    title:
      "If you could change one operational thing this week, what would it be — and what would better look like on a shift?",
    placeholder: "This week I would change…",
  },
  {
    id: "anything_else",
    section: "Operations",
    type: "text",
    rows: 4,
    optional: true,
    title: "Is there anything we did not ask that you need us to hear?",
    helper: "Optional.",
    placeholder: "Anything else…",
  },
];

export type Answers = Record<string, unknown>;

export function habitLabel(id: string): string {
  return HABITS.find((h) => h.id === id)?.label ?? id;
}

export function optionLabel(options: Choice[], id: string): string {
  return options.find((o) => o.id === id)?.label ?? id;
}

export function roleLabel(id: unknown): string {
  return typeof id === "string" ? optionLabel(ROLE_OPTIONS, id) : "Team";
}

function parseHabits(raw: unknown): ManagerNote["habits"] {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const src = raw as Record<string, unknown>;
  const habits: ManagerNote["habits"] = {};
  for (const habit of HABITS) {
    const n = src[habit.id];
    if (typeof n === "number" && Number.isFinite(n)) {
      const rounded = Math.round(n);
      if (rounded >= 1 && rounded <= 5) habits[habit.id] = rounded;
    }
  }
  return habits;
}

export function parseManager(raw: unknown): ManagerNote {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ...EMPTY_MANAGER, habits: {} };
  }
  const t = raw as Record<string, unknown>;
  return {
    strength: typeof t.strength === "string" ? t.strength : "",
    weakness: typeof t.weakness === "string" ? t.weakness : "",
    skipped: t.skipped === true,
    habits: parseHabits(t.habits),
  };
}

export function habitsComplete(habits: ManagerNote["habits"]): boolean {
  return HABITS.every((h) => {
    const n = habits[h.id];
    return typeof n === "number" && n >= 1 && n <= 5;
  });
}

export function isAnswered(question: Question, value: unknown): boolean {
  if (question.type === "single") {
    return typeof value === "string" && value.length > 0;
  }
  if (question.type === "multi") {
    return Array.isArray(value) && value.length > 0;
  }
  if (question.type === "scale") {
    return typeof value === "number" && value >= 1 && value <= 5;
  }
  if (question.type === "text") {
    if (question.optional) return true;
    const min = question.minChars ?? 1;
    return typeof value === "string" && value.trim().length >= min;
  }
  if (question.type === "manager_pair") {
    const note = parseManager(value);
    return note.skipped || habitsComplete(note.habits);
  }
  return false;
}

export function summarizeAnswer(question: Question, value: unknown): string | null {
  if (question.type === "single" && typeof value === "string") {
    return optionLabel(question.options, value);
  }
  if (question.type === "multi" && Array.isArray(value) && value.length) {
    return value
      .map((id) => optionLabel(question.options, String(id)))
      .join(" · ");
  }
  if (question.type === "scale" && typeof value === "number") {
    return `${value} / 5`;
  }
  if (question.type === "text" && typeof value === "string" && value.trim()) {
    return value.trim();
  }
  if (question.type === "manager_pair") {
    const note = parseManager(value);
    if (note.skipped) return "Have not worked with them";
    const parts: string[] = [];
    for (const habit of HABITS) {
      const n = note.habits[habit.id];
      if (typeof n === "number") parts.push(`${habitLabel(habit.id)}: ${n}/5`);
    }
    const strength = note.strength.trim();
    const weakness = note.weakness.trim();
    if (strength) parts.push(`Strength: ${strength}`);
    if (weakness) parts.push(`Weakness: ${weakness}`);
    return parts.length ? parts.join("\n") : null;
  }
  return null;
}

const SAFE_KEY = (key: string) =>
  key !== "__proto__" && key !== "constructor" && key !== "prototype";

export function sanitizeAnswers(raw: unknown): Answers {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Answers = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (SAFE_KEY(key)) out[key] = value;
  }
  return out;
}

export function answersComplete(answers: Answers): boolean {
  return QUESTIONS.every((q) => isAnswered(q, answers[q.id]));
}
