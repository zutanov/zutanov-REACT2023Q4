import { render, screen, waitFor } from '@testing-library/react';
import { heroesData } from '../../mocks/mockedData';
import Hero from './Hero';
import { BrowserRouter } from 'react-router-dom';
import MarvelProvider from '../../context/MarvelProvider';
import userEvent from '@testing-library/user-event';

const mockedHeroData = [heroesData.results[0]];

describe('Card Component', () => {
  it('Clicking on a card opens a detailed hero component', async () => {
    render(
      <BrowserRouter>
        <MarvelProvider.Provider
          value={{
            loading: false,
            result: mockedHeroData,
          }}
        >
          <Hero />
        </MarvelProvider.Provider>
      </BrowserRouter>
    );

    const comicsPageTitle = screen.queryByText('List of Comics');
    expect(comicsPageTitle).toBeNull();

    const showComicsButton = screen.getByRole('link', { name: 'Show comics' });
    userEvent.click(showComicsButton);

    waitFor(() => {
      const comicsPageTitleAfterClick = screen.getByText('List of Comics');
      expect(comicsPageTitleAfterClick).toBeInTheDocument();
    });
  });
});
