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


function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchLogs = async (): Promise<LogDisplay[]> => {
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

  await sleep(400)
  //throw new Error("500")
  return logs
}