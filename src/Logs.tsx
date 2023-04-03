import { useQuery } from '@tanstack/react-query'
import { Link } from "react-router-dom"
import { fetchLogs } from "./api";

export function Logs() {
  const { isLoading, isError, data, error } = useQuery(["logs"], fetchLogs);

  const title = "Booklog";
  const subtitle = "Manage logs and history of your vehicle";

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
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((log) => {
                return (
                  <tr key={log.id.toString()}>
                    <td>{log.date}</td>
                    <td>{log.km.toString()}</td>
                    <td>{log.operations}</td>
                    <td>{log.cost.toString()}</td>
                    <td>{log.garage}</td>
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
        <Link to="/logform">
          <button className="button">New entry</button>
        </Link>
      </section>
    </>
  );
}