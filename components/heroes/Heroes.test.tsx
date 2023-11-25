import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import Heroes from './Heroes';
import { heroesData } from '../../mocks/mockedData';

describe('Heroes Component', () => {
  const handlers = [
    http.get('https://gateway.marvel.com/v1/public/characters', async () => {
      await delay(150);
      return HttpResponse.json({
        data: heroesData,
      });
    }),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('Renders the specified number of cards', async () => {
    renderWithProviders(<Heroes />);
    waitFor(() => {
      const cards = screen.getAllByRole('link');
      expect(cards).toHaveLength(20);
    });
  });
});
describe('Heroes Component', () => {
  const handlers = [
    http.get('https://gateway.marvel.com/v1/public/characters', async () => {
      return HttpResponse.json({
        data: {
          results: [],
        },
      });
    }),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test('Displays an appropriate message if no cards are present', async () => {
    renderWithProviders(<Heroes />);
    await waitFor(() => {
      expect(screen.queryByText(/Heroes not found/i)).toBeInTheDocument();
    });
  });
});
