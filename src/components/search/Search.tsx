import React, { ChangeEvent, SetStateAction } from 'react';
import './search.scss';

interface SearchProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (s?: string) => void;
  search: string;
  setPage: React.Dispatch<SetStateAction<number>>;
}

const Search: React.FC<SearchProps> = ({
  handleInputChange,
  handleSearch,
  search,
  setPage,
}) => {
  const handleBtn = () => {
    if (search) {
      const searchQuery = `nameStartsWith=${search.trimEnd().toLowerCase()}`;
      handleSearch(searchQuery);
      setPage(0);
    } else {
      handleSearch();
    }
  };
  return (
    <div className="search">
      <div className="logo">MARVEL Heroes</div>
      <nav className="search__nav">
        <input
          type="text"
          className="search__input"
          placeholder="search"
          value={search}
          onChange={handleInputChange}
        />
        <button onClick={handleBtn} className="search__btn">
          Search
        </button>
        <button onClick={() => handleSearch('error')} className="search__btn">
          ErrorCall
        </button>
      </nav>
    </div>
  );
};
export default Search;
