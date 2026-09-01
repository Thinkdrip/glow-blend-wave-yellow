import { createFileRoute } from "@tanstack/react-router";
import { SurveyApp } from "@/components/survey";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <SurveyApp />;
}
