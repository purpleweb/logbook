import { InterventionForm } from "../components/InterventionForm";

export function InterventionNew() {
  const title: string = "New Entry";
  const subtitle: string = "Your can use this form to add as many entries as you want in your book log.";

  return <InterventionForm title={title} subtitle={subtitle} />;
}