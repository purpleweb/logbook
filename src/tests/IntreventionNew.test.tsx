import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { InterventionNew } from "../pages/InterventionNew";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi } from "vitest";

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
          <InterventionNew />
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/New Entry/i)).toBeInTheDocument();
  });
});