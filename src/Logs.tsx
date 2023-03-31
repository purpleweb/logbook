import { useState, useEffect } from "react"

type Operation = {
  id: Number
  title: String
}

type Log = {
  id: Number
  date: String
  km: Number
  operations: String
  cost: Number
  garage: String
}

const fetchLogs = async () => {
  const response = await fetch('http://127.0.0.1:8000/interventions/');
  console.log("req")
  const myJson = await response.json();

  const logs: Log[] = []
  for (const obj of myJson) {
    const log: Log = {
      id: obj.id,
      date: obj.date,
      km: 1234,
      operations: obj.operations.reduce((res: string, ope: Operation) => res + ', ' + ope.title, ''),
      cost: 200,
      garage: obj.garage.name
    }
    logs.push(log)
  }

  return logs
}

export function Logs() {
  const [logs, setLogs] = useState<Log[]>([]);

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