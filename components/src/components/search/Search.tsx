import React, { ChangeEvent } from 'react';
import './search.scss';

interface SearchProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (s?: string) => void;
  search: string;
}

class Search extends React.Component<SearchProps> {
  render() {
    const { handleInputChange, handleSearch, search } = this.props;
    const handleBtn = () => {
      if (search) {
        const searchQuery = `nameStartsWith=${search.trimEnd().toLowerCase()}`;
        handleSearch(searchQuery);
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
  }
}
export default Search;
