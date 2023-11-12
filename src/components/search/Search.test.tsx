import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe } from 'vitest';
import Search from './Search';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import MarvelProvider from '../../context/MarvelProvider';

describe('Search Component', () => {
  it('saves entered value to local storage on button click', async () => {
    render(
      <BrowserRouter>
        <MarvelProvider.Provider
          value={{
            handleSearch: vi.fn(),
            searchTerm: '',
            setHeroesLimit: vi.fn(),
            setPage: vi.fn(),
            handleInputChange: vi.fn(),
          }}
        >
          <Search />
        </MarvelProvider.Provider>
      </BrowserRouter>
    );

    const input = screen.getByRole('textbox');
    userEvent.type(input, '3-D Man');

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    waitFor(() => {
      expect(localStorage.getItem('hero')).toBe('3-D Man');
    });
  });
  it('retrieves the value from local storage upon mounting', () => {
    localStorage.setItem('hero', 'venom');

    render(
      <BrowserRouter>
        <MarvelProvider.Provider
          value={{
            handleSearch: vi.fn(),
            searchTerm: '',
            setHeroesLimit: vi.fn(),
            setPage: vi.fn(),
            handleInputChange: vi.fn(),
          }}
        >
          <Search />
        </MarvelProvider.Provider>
      </BrowserRouter>
    );
    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toHaveValue('');
  });
});
