import { render, screen } from '@testing-library/react';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'

import App from './App';

describe("App", () => {
  it("renders headline", () => {
    render(
      <MemoryRouter initialEntries={['/garages']}>
        <App />
      </MemoryRouter>
    );
    screen.debug();
  });
});