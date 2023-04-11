import { InterventionNew } from "../pages/InterventionNew"

type Operation = {
  id: Number
  title: String
}

export type LogDisplay = {
  id: number
  date: string
  km: string
  operations: string
  cost: string
  garage: string
}

export type LogCreate = {
  date: string
  km: number
  operations: string
  cost: number
  garage: string
}

export interface IIntervention {
  id?: number
  date: string
  km: number
  operations: string
  cost: number
  garage: string
  getId: () => number
  getFormatedDate: () => string
  getFormatedKm: () => string
  getFormatedOperations: () => string
  getFormatedCost: () => string
  getFormatedGarage: () => string
  hasId: () => boolean
}

export class Intervention implements IIntervention {
  id?: number | undefined;
  date: string;
  km: number;
  operations: string;
  cost: number;
  garage: string;

  constructor({
    date,
    km,
    operations,
    cost,
    garage,
    id = undefined,
  }: {
    date: string;
    km: number;
    operations: string;
    cost: number;
    garage: string;
    id: number | undefined;
  }) {
    this.date = date;
    this.km = km;
    this.operations = operations;
    this.cost = cost;
    this.garage = garage;
    this.id = id;
  }

  getFormatedDate(): string {
    return new Intl.DateTimeFormat("fr-FR").format(new Date(this.date));
  }
  getFormatedKm(): string {
    return new Intl.NumberFormat().format(this.km);
  }
  getFormatedOperations(): string {
    return this.operations;
  }
  getFormatedCost(): string {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(this.cost);
  }
  getFormatedGarage(): string {
    return this.garage;
  }
  hasId(): boolean {
    return this.id !== undefined;
  }
  getId(): number {
    if (this.id === undefined) {
      throw new Error("id is undefined");
    }
    return this.id;
  }
}

const API_URL = import.meta.env.VITE_API_URL

function sleep(ms: number): Promise<never> {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const createLogCreate = (obj: any): LogCreate => {
    const operations: string = obj.operations.reduce((res: string, ope: Operation) => {
        const sep = res ? ', ' : '';
        return `${res}${sep}${ope.title}`
      }, "");
    const km: number = parseInt(obj.km)
    const cost: number = parseInt(obj.cost)
    const date: string = (new Date(obj.date)).toISOString().split('T')[0]
    const log: LogCreate = {
      date: date,
      km: km,
      operations: operations,
      cost: cost,
      garage: obj.garage.name
    }

    return log
}

const createIntervention = (obj: any): IIntervention => {
  const operations: string = obj.operations.reduce(
    (res: string, ope: Operation) => {
      const sep = res ? ", " : "";
      return `${res}${sep}${ope.title}`;
    },
    ""
  );
  return new Intervention({
    date: obj.date,
    km: obj.km,
    operations: operations,
    cost: obj.cost,
    garage: obj.garage.name,
    id: obj.id
  });
};

export const fetchIntervention = async (): Promise<IIntervention[]> => {
  const response = await fetch(`${API_URL}/interventions/`);
  const myJson = await response.json();

  const interventionList: IIntervention[] = [];
  for (const obj of myJson) {
    interventionList.push(createIntervention(obj));
  }

  return interventionList;
};

export const fetchLog = async (id: Number): Promise<LogCreate> => {
  const response = await fetch(`${API_URL}/interventions/${id}`);
  const myJson = await response.json();

  return createLogCreate(myJson);
};

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
  return response.json();
};

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
  return response.json();
};