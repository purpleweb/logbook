type Operation = {
  id: Number
  title: String
}

export type LogDisplay = {
  id: Number
  date: String
  km: String
  operations: String
  cost: String
  garage: String
}

export type LogCreate = {
  date: string
  km: number
  operations: string
  cost: number
  garage: string
}

const API_URL = import.meta.env.VITE_API_URL

function sleep(ms: number): Promise<never> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchLogs = async (): Promise<LogDisplay[]> => {
  const response = await fetch(`${API_URL}/interventions/`);
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

  //await sleep(400)
  //throw new Error("500")
  return logs
}

export const deleteLog = async (id: Number) => {
  const response = await fetch(`${API_URL}/interventions/${id}`, {
    method: "DELETE",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json()
}

export const createLog = async (data: LogCreate) => {
  const response = await fetch(`${API_URL}/interventions/`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json()
};