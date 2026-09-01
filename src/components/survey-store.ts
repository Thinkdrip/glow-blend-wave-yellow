import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  QUESTIONS,
  isAnswered,
  type Answers,
} from "@/lib/survey";

export type Screen = "welcome" | "question" | "thanks";

type SurveyState = {
  screen: Screen;
  index: number;
  answers: Answers;
  submitted: boolean;
  setAnswer: (id: string, value: unknown) => void;
  start: () => void;
  resume: () => void;
  next: () => void;
  back: () => void;
  reset: () => void;
  markSubmitted: () => void;
  currentQuestion: () => (typeof QUESTIONS)[number] | null;
  canContinue: () => boolean;
  hasDraft: () => boolean;
};

export const useSurvey = create<SurveyState>()(
  persist(
    (set, get) => ({
      screen: "welcome",
      index: 0,
      answers: {},
      submitted: false,
      setAnswer: (id, value) =>
        set((s) => ({ answers: { ...s.answers, [id]: value } })),
      start: () =>
        set({ screen: "question", index: 0, answers: {}, submitted: false }),
      resume: () => {
        const { answers, submitted } = get();
        if (submitted) {
          set({ screen: "thanks" });
          return;
        }
        const idx = QUESTIONS.findIndex((q) => !isAnswered(q, answers[q.id]));
        set({
          screen: "question",
          index: idx === -1 ? QUESTIONS.length - 1 : idx,
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
          set({ screen: "question", index: QUESTIONS.length - 1 });
          return;
        }
        if (screen === "question" && index === 0) {
          set({ screen: "welcome" });
          return;
        }
        if (screen === "question") set({ index: index - 1 });
      },
      reset: () =>
        set({ screen: "welcome", index: 0, answers: {}, submitted: false }),
      markSubmitted: () => set({ submitted: true, screen: "thanks" }),
      currentQuestion: () => {
        const { screen, index } = get();
        return screen === "question" ? (QUESTIONS[index] ?? null) : null;
      },
      canContinue: () => {
        const q = get().currentQuestion();
        return q ? isAnswered(q, get().answers[q.id]) : false;
      },
      hasDraft: () => {
        const { answers, submitted } = get();
        return !submitted && Object.keys(answers).length > 0;
      },
    }),
    {
      name: "patio-pulse-foh-v1",
      partialize: (s) => ({
        index: s.index,
        answers: s.answers,
        submitted: s.submitted,
        screen: s.screen,
      }),
    },
  ),
);
