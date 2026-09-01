import { createFileRoute } from "@tanstack/react-router";
import { ResultsPage } from "@/components/results";

export const Route = createFileRoute("/pulse")({ component: PulsePage });

function PulsePage() {
  return <ResultsPage />;
}
