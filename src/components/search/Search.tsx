import React, { useContext } from 'react';
import './search.scss';
import Context from '../../context/MarvelProvider';

const Search = () => {
  const {
    searchTerm,
    setPage,
    handleInputChange,
    handleSearch,
    setHeroesLimit,
  } = useContext(Context);
  const handleBtn = async () => {
    if (searchTerm) {
      const searchQuery = `nameStartsWith=${searchTerm
        .trimEnd()
        .toLowerCase()}`;
      await handleSearch(searchQuery);
      localStorage.setItem('hero', JSON.stringify(searchTerm));
      setPage(0);
      setHeroesLimit(20);
    } else {
      handleSearch();
      setHeroesLimit(20);
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
          value={searchTerm}
          onChange={(e) => handleInputChange(e)}
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
