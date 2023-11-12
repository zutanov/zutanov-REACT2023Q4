import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Heroes from './Heroes';
import MarvelProvider from '../../context/MarvelProvider';
import { heroesData } from '../../mocks/mockedData';

describe('Heroes Component', () => {
  test('Renders the specified number of cards', async () => {
    render(
      <BrowserRouter>
        <MarvelProvider.Provider
          value={{
            loading: false,
            result: heroesData.results,
          }}
        >
          <Heroes />
        </MarvelProvider.Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      const cards = screen.getAllByRole('link');
      expect(cards).toHaveLength(20);
    });
  });

  test('Displays an appropriate message if no cards are present', async () => {
    render(
      <BrowserRouter>
        <MarvelProvider.Provider
          value={{
            loading: false,
            result: [],
          }}
        >
          <Heroes />
        </MarvelProvider.Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(() => screen.getByText('Heroes not found'));
    });
  });
});
