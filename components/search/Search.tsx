import styles from '../../styles/search.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setSearchTerm } from '../../store/reducers/searchSlice';
import { useInput } from '../../hooks/input';
import { useEffect, useState } from 'react';

const Search = () => {
  const { value, setValue, onChange } = useInput('');
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();

  const { searchTerm } = useAppSelector((state) => state.search);

  useEffect(() => {
    dispatch(setSearchTerm(localStorage.getItem('hero') || ''));
    setValue(searchTerm);
  }, []);

  const handleBtn = async () => {
    localStorage.setItem('hero', value);
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
    <div className={styles.search}>
      <div className={styles.logo}></div>
      <nav className={styles.search__nav}>
        <input
          type="text"
          className={styles.search__input}
          placeholder="search"
          value={value}
          onChange={(e) => onChange(e)}
        />
        <button onClick={handleBtn} className={styles.search__btn}>
          Search
        </button>
        <button onClick={errorThrow} className={styles.search__btn}>
          ErrorCall
        </button>
      </nav>
    </div>
  );
};
export default Search;
