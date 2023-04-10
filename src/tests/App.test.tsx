import { render, screen } from '@testing-library/react';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'

import App from '../App';

describe("Garage", () => {
  it("renders headline", () => {
    render(
      <MemoryRouter initialEntries={['/garages']}>
        <App />
      </MemoryRouter>
    );
    const headline = screen.getByText(/^Garages$/i)
    expect(headline).toBeInTheDocument()
  });
});
