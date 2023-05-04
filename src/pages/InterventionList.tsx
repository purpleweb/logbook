import { Link, useLocation } from "react-router-dom"
import { useInterventionListQuery } from '../utils/apiHooks';
import { deleteIntervention } from "../utils/api";
import { useMutation, QueryClient, useQueryClient } from '@tanstack/react-query'
import { toast } from "react-toastify";

export function InterventionList() {
  const { isLoading, isError, data, error } = useInterventionListQuery()
  const title = "Booklog";
  const subtitle = "Manage logs and history of your vehicle";
  const queryClient = useQueryClient();

  const { state }: {state: { id: number} } | undefined = useLocation();
  const createdId = (state && state.id) ? state.id : undefined;

  const mutation = useMutation({
    mutationFn: deleteIntervention,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interventions"] });
    },
  });

  const onDelete = (id: Number): void => {
    mutation.mutate(id);
    toast.success("Intervention deleted", { position: "bottom-center" });
  }

  return (
    <>
      <section className="hero">
        <div className="hero-body">
          <p className="title">{title}</p>
          <p className="subtitle">{subtitle}</p>
        </div>
      </section>
      <section className="table-section">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Km</th>
              <th>Operations</th>
              <th>Cost</th>
              <th>Garage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((intervention) => {
                if (!intervention.hasId()) { return "" }
                return (
                  <tr key={intervention.getId().toString()} className={createdId == intervention.getId() ? "just-created" : ''}>
                    <td>{intervention.getFormatedDate()}</td>
                    <td>{intervention.getFormatedKm()}</td>
                    <td>{intervention.getFormatedOperations()}</td>
                    <td>{intervention.getFormatedCost()}</td>
                    <td>{intervention.getFormatedGarage()}</td>
                    <td>
                      <div className="actions">
                        <button className="button is-small is-danger" onClick={() => onDelete(intervention.getId())} > delete </button>
                        <Link to={`/intervention/${intervention.id}/edit`}>
                          <button className="button is-small is-warning"> update </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isLoading && "Loading ..."}

        {isError && (
          <article className="message is-danger">
            <div className="message-body">
              An error have occured. Unable to fetch data.
            </div>
          </article>
        )}
      </section>

      <section>
        <Link to="/intervention/new">
          <button className="button">New entry</button>
        </Link>
      </section>
    </>
  );
}