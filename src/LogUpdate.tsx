import { useParams } from "react-router-dom";
import { LogForm } from "./LogForm";

export function LogUpdate() {
  const { id } = useParams<{id: string}>();
  const title: string = "Update Entry";
  const subtitle: string =
    "Your can use this form to update an existing entry.";

  if (!id) return (<div>Invalid id</div>)

  return <LogForm title={title} subtitle={subtitle} id={parseInt(id)} />;
}
