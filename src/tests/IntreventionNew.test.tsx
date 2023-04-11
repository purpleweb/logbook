import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { InterventionNew } from "../pages/InterventionNew";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi, expect } from "vitest";
import { upsertIntervention, Intervention } from "../utils/api";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("Intervention New page", () => {
  it("shoult call upsert callback", async () => {

    const upsertInterventionMock = (
      intervention: Intervention
    ): Promise<{ id: number }> => {
      return new Promise((resolve, reject) => {
        resolve({ id: 4 });
      });
    };

    const spyObj = {
        call: upsertInterventionMock
    }
    const spy = vi.spyOn(spyObj, 'call')

    render(
      <MemoryRouter initialEntries={["/"]}>
        <QueryClientProvider client={queryClient}>
          <InterventionNew handleInterventionSave={spyObj.call} />
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/New Entry/i)).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("input-date"), {
      target: { value: "2021-01-06" },
    });
    fireEvent.change(screen.getByTestId("input-km"), {
      target: { value: "120000" },
    });
    fireEvent.change(screen.getByTestId("input-operations"), {
      target: { value: "Vidange" },
    });
    fireEvent.change(screen.getByTestId("input-cost"), {
      target: { value: "520.50" },
    });
    fireEvent.change(screen.getByTestId("input-garage"), {
      target: { value: "Garage de l'Eglise" },
    });

    fireEvent.click(screen.getByTestId("submit"));

    await waitFor(() => { 
        expect(spy).toHaveBeenCalled()
        expect(spy).toHaveBeenCalledWith({
            date: "2021-01-06",
            km: "120000",
            operations: "Vidange",
            cost: "520.50",
            garage: "Garage de l'Eglise"
        });
    })
  });
});