import { screen, waitFor } from '@testing-library/react';
import { describe } from 'vitest';
import Search from './Search';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/test-utils';

describe('Search Component', () => {
  it('saves entered value to local storage on button click', async () => {
    renderWithProviders(<Search />);

    const set = vi.spyOn(Object.getPrototypeOf(localStorage), 'setItem');
    const search = await screen.findByText('Search');
    await userEvent.click(search);
    expect(set).toBeCalled();
  });

  it('retrieves the value from local storage upon mounting', async () => {
    const mocked = 'venom';
    vi.spyOn(Object.getPrototypeOf(localStorage), 'getItem').mockReturnValue(
      mocked
    );

    renderWithProviders(<Search />, {
      preloadedState: {
        search: {
          searchTerm: localStorage.getItem('hero') || '',
        },
      },
    });
    const search = screen.getByRole('textbox');
    await waitFor(() => {
      expect(search).toHaveAttribute('value', mocked);
    });
  });
});
