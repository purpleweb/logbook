import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { Intervention, IIntervention } from "../utils/api";

vi.mock("../utils/apiHooks", () => {
  
  let interventionList: IIntervention[] = []

  interventionList.push(
    new Intervention({
      id: 2,
      date: "2021-01-10",
      km: 110000,
      operations: "Révision",
      cost: 500,
      garage: "Speedy Versailles Chantier",
    })
  );
  interventionList.push(
    new Intervention({
      id: 1,
      date: "2022-11-16",
      km: 122000,
      operations: "Vidange, Plaquettes AV",
      cost: 320.50,
      garage: "Speedy le Chesnay",
    })
  );

  const useInterventionListQuery = () => ({
    status: "success",
    isLoading: false,
    isError: false,
    data: interventionList,
    error: undefined,
  });
  return { useInterventionListQuery: useInterventionListQuery };
});

import { InterventionList } from "../pages/InterventionList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("Logs page", () => {
  it("shoult display the logs list", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <QueryClientProvider client={queryClient}>
          <InterventionList />
        </QueryClientProvider>
      </MemoryRouter>
    );

    const garage1 = screen.getByText(/Speedy Versailles Chantier/i);
    expect(garage1).toBeInTheDocument();

    const garage2 = screen.getByText(/Speedy le Chesnay/i);
    expect(garage2).toBeInTheDocument();
  });
});