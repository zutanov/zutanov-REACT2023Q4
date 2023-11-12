import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

describe('App', () => {
  test('App title displays correctly', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const logo = screen.getByText(/Marvel/i);
    expect(logo).toBeInTheDocument();
  });
});
