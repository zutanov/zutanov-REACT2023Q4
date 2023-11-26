import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './404';
import { renderWithProviders } from '../test/test-utils';
import MainLayout from './layout';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../test/createMockRouter';

describe('NotFound Component', () => {
  test('displays the 404 page for invalid route', () => {
    render(<NotFound />);
    const notFoundHeading = screen.getByRole('heading', {
      name: /404 Not Found/i,
    });
    const notFoundMessage = screen.getByText(/Sorry, page does not exist/i);

    expect(notFoundHeading).toBeInTheDocument();
    expect(notFoundMessage).toBeInTheDocument();
  });
  test('displays the 404 page for invalid route', async () => {
    const badRoute = '/badroute';
    const mockRouter = createMockRouter({
      pathname: badRoute,
    });

    renderWithProviders(
      <RouterContext.Provider value={mockRouter}>
        {badRoute ? <NotFound /> : <MainLayout />}
      </RouterContext.Provider>
    );

    const notFoundHeading = screen.getByRole('heading', {
      name: /404 Not Found/i,
    });
    const notFoundMessage = screen.getByText(/Sorry, page does not exist/i);
    expect(notFoundHeading).toBeInTheDocument();
    expect(notFoundMessage).toBeInTheDocument();
  });
});
