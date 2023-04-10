import { Link, useLocation } from "react-router-dom"
import { useLogsQuery } from './apiHooks';
import { deleteLog } from "./api";
import { useMutation, QueryClient, useQueryClient } from '@tanstack/react-query'
import { toast } from "react-toastify";

export function Logs() {
  const { isLoading, isError, data, error } = useLogsQuery()
  const title = "Booklog";
  const subtitle = "Manage logs and history of your vehicle";
  const queryClient = useQueryClient();

  const { state } = useLocation();
  let createdId: number | undefined = undefined;
  if (state && state.id) {
    createdId = state.id;
  }

  const mutation = useMutation({
    mutationFn: deleteLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
  });

  const onDelete = (id: Number) => {
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
      <section>
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
              data.map((log) => {
                return (
                  <tr key={log.id.toString()} className={createdId == log.id ? "just-created" : ''}>
                    <td>{log.date}</td>
                    <td>{log.km.toString()}</td>
                    <td>{log.operations}</td>
                    <td>{log.cost.toString()}</td>
                    <td>{log.garage}</td>
                    <td>
                      <button className="button is-small is-danger" onClick={() => onDelete(log.id)} > delete </button>
                      <Link to={`/log-update/${log.id}`}>
                        <button className="button is-small is-warning"> update </button>
                      </Link>
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
        <Link to="/log-create">
          <button className="button">New entry</button>
        </Link>
      </section>
    </>
  );
}