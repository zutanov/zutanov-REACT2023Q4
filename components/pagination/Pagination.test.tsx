import { screen, waitFor, render } from '@testing-library/react';
import Pagination from './Pagination';
import { heroesData } from '../../mocks/mockedData';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import Heroes from '../../components/heroes/Heroes';
import userEvent from '@testing-library/user-event';

const store = setupStore();
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

describe('Pagination Component', () => {
  it('Updates URL query parameter when page changes', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Heroes />
          <Pagination />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();
    const spyAnchorTag = vi.spyOn(user, 'click');
    const searchButton = screen.getByRole('button', { name: /Next/i });
    user.click(searchButton);
    expect(spyAnchorTag).toHaveBeenCalledOnce();

    waitFor(() => {
      expect(window.location.search).toBe('/?offset=2');
    });
  });
});
