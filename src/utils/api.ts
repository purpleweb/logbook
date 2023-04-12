type Operation = {
  id: Number
  title: String
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
    id?: number | undefined;
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

export const fetchInterventionList = async (): Promise<IIntervention[]> => {
  const response = await fetch(`${API_URL}/interventions/`);
  const myJson = await response.json();

  const interventionList: IIntervention[] = [];
  for (const obj of myJson) {
    interventionList.push(createIntervention(obj));
  }

  return interventionList;
};

export const fetchIntervention = async (id: Number): Promise<IIntervention> => {
  const response = await fetch(`${API_URL}/interventions/${id}`);
  const myJson = await response.json();

  return createIntervention(myJson);
};

export const deleteIntervention = async (id: Number) => {
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

export const upsertIntervention = async (intervention: Intervention): Promise<{id: number}> =>  {
  const response = await fetch(`${API_URL}/interventions/`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(intervention),
  });
  return response.json();
};