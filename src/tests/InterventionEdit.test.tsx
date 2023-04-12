import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../components/App";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi, expect } from "vitest";
import createFetchMock from 'vitest-fetch-mock';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const API_URL = import.meta.env.VITE_API_URL;
const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe("Intervention Edit page", () => {
  beforeEach(() => {
    fetchMocker.resetMocks();
  });

  it("should save data when editing an intervention", async () => {
    const mock = fetchMocker.mockResponseOnce(
      JSON.stringify({
        id: 4,
        date: "2021-01-06",
        km: 120000,
        cost: 520.5,
        description: null,
        garage: { name: "Garage de l'Eglise", phone: null, id: 11 },
        operations: [{ id: 4, title: "Vidange" }],
      })
    );

    render(
      <MemoryRouter initialEntries={["/intervention/4/edit"]}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Edit Entry/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId("input-operations")).toBeInTheDocument();
      expect(screen.getByTestId("input-operations")).toHaveValue("Vidange");
    });

    const NEW_DATE = "2023-03-11";
    fireEvent.change(screen.getByTestId("input-date"), { target: { value: NEW_DATE }, });
    const NEW_KM = 121000
    fireEvent.change(screen.getByTestId("input-km"), { target: { value: NEW_KM }, });
    const NEW_COST = 519
    fireEvent.change(screen.getByTestId("input-cost"), { target: { value: NEW_COST }, });
    const NEW_GARAGE = "Garage de la mairie";
    fireEvent.change(screen.getByTestId("input-garage"), { target: { value: NEW_GARAGE }, });
    const NEW_OPERATIONS = "Vidange, Révision"
    fireEvent.change(screen.getByTestId("input-operations"), { target: { value: NEW_OPERATIONS }, });

    fetchMocker.mockResponseOnce(
      JSON.stringify({
        date: "2023-03-10",
        km: 120000,
        description: null,
        id: 4,
        cost: 155.0,
        garage_id: 13,
        operations: [{ id: 1, title: "Révision" }],
        garage: {
          id: 13,
          phone: null,
          name: "Garage Speedy Versailles Chantier",
        },
      })
    );

    fetchMocker.mockResponseOnce(
      JSON.stringify([
        {
          id: 4,
          date: "2020-12-31",
          km: 125200,
          cost: 199.0,
          description: null,
          garage: { name: "Garage de la mairie", phone: null, id: 5 },
          operations: [
            { id: 1, title: "Révision" },
            { id: 4, title: "Vidange" },
          ],
        },
        {
          id: 32,
          date: "2021-01-06",
          km: 120000,
          cost: 520.5,
          description: null,
          garage: { name: "Garage de l'Eglise", phone: null, id: 11 },
          operations: [{ id: 4, title: "Vidange" }],
        },
      ])
    );

    fireEvent.click(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(mock).toHaveBeenNthCalledWith(2, `${API_URL}/interventions/`, {
        body: JSON.stringify({
          id: 4,
          date: NEW_DATE,
          km: NEW_KM.toString(),
          operations: NEW_OPERATIONS,
          cost: NEW_COST.toString(),
          garage: NEW_GARAGE,
        }),
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        method: "POST",
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });
    });
  });
});
