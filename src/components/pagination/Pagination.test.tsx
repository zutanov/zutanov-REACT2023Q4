import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Pagination from './Pagination';
import MarvelProvider from '../../context/MarvelProvider';

describe('Pagination Component', () => {
  it('Updates URL query parameter when page changes', () => {
    render(
      <BrowserRouter>
        <MarvelProvider.Provider
          value={{
            handleSearch: vi.fn(),
            pageQty: 5,
            limit: 20,
            setHeroesLimit: vi.fn(),
          }}
        >
          <Pagination />
        </MarvelProvider.Provider>
      </BrowserRouter>
    );

    expect(window.location.search).toEqual('');

    const searchButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(searchButton);

    expect(window.location.search).toBe('?offset=2');
  });
});
