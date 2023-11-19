import { fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import ComicsPage from './ComicsPage';
import { http, delay, HttpResponse } from 'msw';
import { comicsData } from '../../mocks/mockedData';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../../test/test-utils';

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
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  it('displays a loading indicator while fetching data', async () => {
    renderWithProviders(
      <MemoryRouter>
        <ComicsPage />
      </MemoryRouter>
    );

    const loader = screen.getByRole('img');

    expect(screen.getByText('List of Comics')).toBeInTheDocument();

    expect(loader).toHaveClass('loader__img');
  });

  it('close Comics page by click the button', async () => {
    renderWithProviders(
      <BrowserRouter>
        <ComicsPage />
      </BrowserRouter>
    );

    const closeButton = screen.getByText('Back');
    fireEvent.click(closeButton);

    waitFor(() => {
      expect(screen.queryByText('List of Comics')).toBeNull();
    });
  });

  it('The detailed card component correctly displays the detailed card data', async () => {
    renderWithProviders(
      <MemoryRouter>
        <ComicsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      const imgClass = screen.getAllByRole('img');
      expect(imgClass[0]).toHaveClass('comics__img');
      expect(
        screen.getByText('Avengers: The Initiative (2007) #19')
      ).toBeInTheDocument();
    });
  });
});
