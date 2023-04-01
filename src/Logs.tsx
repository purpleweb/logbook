import { useState, useEffect } from "react"

type Operation = {
  id: Number
  title: String
}

type LogDisplay = {
  id: Number
  date: String
  km: String
  operations: String
  cost: String
  garage: String
}

const fetchLogs = async () => {
  const response = await fetch('http://127.0.0.1:8000/interventions/');
  const myJson = await response.json();

  const logs: LogDisplay[] = []
  for (const obj of myJson) {
    const operations: string = obj.operations.reduce((res: string, ope: Operation) => {
        const sep = res ? ', ' : '';
        return `${res}${sep}${ope.title}`
      }, "");
    const km: string = new Intl.NumberFormat().format(obj.km)
    const cost: string = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(obj.cost)
    const date: string = new Intl.DateTimeFormat("fr-FR").format(new Date(obj.date))
    const log: LogDisplay = {
      id: obj.id,
      date: date,
      km: km,
      operations: operations,
      cost: cost,
      garage: obj.garage.name
    }
    logs.push(log)
  }

  return logs
}

export function Logs() {
  const [logs, setLogs] = useState<LogDisplay[]>([]);

  useEffect(() => {
    fetchLogs().then((logs) => {
      setLogs(logs);
    });
  }, []);

  const breadcrumbTitle = "Logs";
  const title = "Booklogs";
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
            {logs.map((log) => {
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
      </section>
    </>
  );
}