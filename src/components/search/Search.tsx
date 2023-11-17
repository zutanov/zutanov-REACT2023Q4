import './search.scss';
import { useAppDispatch } from '../../hooks/redux';
import { setSearchTerm } from '../../store/reducers/heroesSlice';
import { useInput } from '../../hooks/input';
import { useState } from 'react';

const Search = () => {
  const { value, onChange } = useInput('');
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();
  const handleBtn = async () => {
    dispatch(setSearchTerm(value.trim()));
  };

  const errorThrow = () => {
    try {
      throw new Error('Error in search component');
    } catch (e) {
      setIsError(true);
      console.log(e);
    }
  };

  if (isError) throw new Error('Error!');

  return (
    <div className="search">
      <div className="logo"></div>
      <nav className="search__nav">
        <input
          type="text"
          className="search__input"
          placeholder="search"
          value={value}
          onChange={(e) => onChange(e)}
        />
        <button onClick={handleBtn} className="search__btn">
          Search
        </button>
        <button onClick={errorThrow} className="search__btn">
          ErrorCall
        </button>
      </nav>
    </div>
  );
};
export default Search;
