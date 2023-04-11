import { InterventionForm, handleInterventionSave } from "../components/InterventionForm";

export function InterventionNew({handleInterventionSave: handleInterventionSave} : {handleInterventionSave?: handleInterventionSave}) {
  const title: string = "New Entry";
  const subtitle: string = "Your can use this form to add as many entries as you want in your book log.";

  return <InterventionForm title={title} subtitle={subtitle} handleInterventionSave={handleInterventionSave} />;
}