import { screen, waitFor } from '@testing-library/react';
import { heroesData } from '../../mocks/mockedData';
import Hero from './Hero';
import userEvent from '@testing-library/user-event';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../../test/test-utils';

const mockedHeroData = heroesData.results[0];

const handlers = [
  http.get('https://gateway.marvel.com/v1/public/characters', async () => {
    await delay(150);
    return HttpResponse.json({
      data: [mockedHeroData],
    });
  }),
];

const server = setupServer(...handlers);

describe('Card Component', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  beforeEach(() => {
    renderWithProviders(
      <Hero
        key={mockedHeroData.id}
        id={mockedHeroData.id}
        thumbnail={mockedHeroData.thumbnail}
        name={mockedHeroData.name}
      />
    );
  });

  it('Ensure that the card component renders the relevant card data', async () => {
    const heroID = screen.getByRole('img');
    const heroName = screen.getByRole('heading', { name: /3-D Man/i });
    expect(heroID).toHaveAttribute(
      'src',
      `http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784/portrait_xlarge.jpg`
    );
    expect(heroName).toBeInTheDocument();
  });

  it('Clicking on a card opens a detailed hero component', async () => {
    const comicsPageTitle = screen.queryByText('List of Comics');
    expect(comicsPageTitle).toBeNull();

    const showComicsButton = screen.getByRole('link', { name: 'Show comics' });
    await userEvent.click(showComicsButton);

    waitFor(() => {
      const comicsPageTitleAfterClick = screen.getByText(/List of Comics/i);
      expect(comicsPageTitleAfterClick).toBeInTheDocument();
    });
  });

  it('Clicking triggers an additional API call to fetch detailed information', async () => {
    const user = userEvent.setup();
    const spyAnchorTag = vi.spyOn(user, 'click');
    const showComicsButton = screen.getByRole('link', { name: 'Show comics' });
    await user.click(showComicsButton);

    expect(spyAnchorTag).toHaveBeenCalledOnce();
  });
});
