import { LogForm } from "./LogForm";

export function LogCreate() {
  const title: string = "New Entry";
  const subtitle: string =
    "Your can use this form to add as many entries as you want in your book log.";

  return <LogForm title={title} subtitle={subtitle} />;
}