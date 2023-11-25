import { fireEvent, screen, waitFor } from '@testing-library/react';
import ComicsPage from './index';
import { http, delay, HttpResponse } from 'msw';
import { comicsData } from '../../../mocks/mockedData';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../../../test/test-utils';
import { useRouter } from 'next/router';
import { vi } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../../../test/createMockRouter';
import userEvent from '@testing-library/user-event';
import MainLayout from '../../layout';

const handlers = [
  http.get(
    'https://gateway.marvel.com/v1/public/characters/:id/comics',
    async () => {
      await delay(150);
      return HttpResponse.json({
        data: comicsData,
      });
    }
  ),
];

const server = setupServer(...handlers);

describe('Comics Component', () => {
  // vi.mock('next/router', () => ({
  //   ...(vi.importActual('next/router') as object),
  //   useRouter: vi.fn(),
  // }));

  // (useRouter as vi.Mock).mockReturnValue({
  //   pathName: '/comics/',
  //   query: { id: '1011034' },
  // });

  beforeEach(() => {
    renderWithProviders(
      <RouterContext.Provider
        value={createMockRouter({
          pathname: '/comics/',
          query: { id: '1011034' },
        })}
      >
        <ComicsPage />
      </RouterContext.Provider>
    );
  });
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('displays a loading indicator while fetching data', async () => {
    const loader = screen.getByRole('img');
    expect(screen.getByText('List of Comics')).toBeInTheDocument();
    expect(loader).toHaveAttribute('alt', 'loader');
  });

  it('close Comics page by click the button', async () => {
    const closeButton = screen.getByText('Back');

    await waitFor(() => {
      if (closeButton) {
        fireEvent.click(closeButton);
      }
    });

    await waitFor(() => {
      expect(closeButton).toBeNull();
    });

    // await waitFor(() => {
    //   expect(screen.queryByText('List of Comics')).toBeNull();
    // });
  });

  it('The detailed card component correctly displays the detailed card data', async () => {
    await waitFor(() => {
      const imgClass = screen.getAllByRole('img');
      expect(imgClass[0]).toHaveAttribute('src');
      expect(
        screen.getByText('Avengers: The Initiative (2007) #19')
      ).toBeInTheDocument();
    });
  });
});
