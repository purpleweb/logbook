import { useParams } from "react-router-dom";
import { InterventionForm } from "../components/InterventionForm";

export function InterventionEdit() {
  const { id } = useParams<{id: string}>();
  const title: string = "Edit Entry";
  const subtitle: string = "Your can use this form to update an existing entry.";

  if (!id) return (<div>Invalid id</div>)

  return <InterventionForm title={title} subtitle={subtitle} id={parseInt(id)} />;
}
