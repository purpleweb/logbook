import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { Logs } from "./Logs";
import { vi } from 'vitest'
import { LogDisplay } from "./api";

vi.mock("./apiHooks", () => {
  const logsList: LogDisplay[] = [
    {
      id: 2,
      date: "10/01/2021",
      km: "110 000",
      operations: "Révision",
      cost: "500,00",
      garage: "Speedy Versailles Chantier",
    },
    {
      id: 1,
      date: "16/11/2022",
      km: "122 000",
      operations: "Vidange, Plaquettes AV",
      cost: "320,50",
      garage: "Speedy le Chesnay",
    },
  ];
  const useLogsQuery = () => ({
    status: "success",
    isLoading: false,
    isError: false,
    data: logsList,
    error: undefined,
  });
  return { useLogsQuery: useLogsQuery };
});

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
      <MemoryRouter initialEntries={["/garages"]}>
        <QueryClientProvider client={queryClient}>
          <Logs />
        </QueryClientProvider>
      </MemoryRouter>
    );

    const garage1 = screen.getByText(/Speedy Versailles Chantier/i);
    expect(garage1).toBeInTheDocument();

    const garage2 = screen.getByText(/Speedy le Chesnay/i);
    expect(garage2).toBeInTheDocument();
  });
});