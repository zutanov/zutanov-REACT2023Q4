import { Link, useLocation, useNavigate } from 'react-router-dom';
import './pagination.scss';
import React, { useContext, useRef } from 'react';
import Context from '../../context/MarvelProvider';

const Pagination: React.FC = () => {
  const { pageQty, limit, handleSearch, setHeroesLimit } = useContext(Context);

  const page = useRef(0);
  const history = useNavigate();
  const location = useLocation();

  const changeLocation = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('offset', String(page.current / limit + 1));
    history(`?${searchParams.toString()}`);
  };

  const handleChange = (direction: string) => {
    if (direction === 'prev') {
      page.current -= limit;
    } else {
      page.current += limit;
    }
    handleSearch(`offset=${page.current}`, limit);
    changeLocation();
  };

  const handleClick = (idx: number) => {
    page.current = idx * limit;
    handleSearch(`offset=${page.current}`, limit);
    changeLocation();
  };

  const setLimit = async (n: number) => {
    page.current = 0;
    setHeroesLimit(n);
    await handleSearch('offset=0', n);
  };

  const disabledBtn = () => {
    if (limit === 5 && page.current > 90) return true;
    if (limit === 10 && page.current > 80) return true;
    if (limit === 15 && page.current > 100 - limit) return true;
    if (limit === 20 && page.current > 100 - limit * 2) return true;
    return false;
  };

  if (pageQty === 0) return null;

  return (
    <div className="pagination">
      <div className="pagination__wrapper">
        <button
          className="pagination__btn"
          disabled={page.current ? false : true}
          onClick={() => handleChange('prev')}
        >
          Prev
        </button>
        <div className="pagination__pages">
          {Array.from({ length: pageQty }, (_, idx) => (
            <Link
              to={'/'}
              className={`${
                page.current / limit === idx
                  ? 'pagination__page active'
                  : 'pagination__page'
              }`}
              key={idx + 1}
              onClick={() => handleClick(idx)}
            >
              {idx + 1}
            </Link>
          ))}
        </div>
        <button
          className="pagination__btn"
          disabled={disabledBtn()}
          onClick={() => handleChange('next')}
        >
          Next
        </button>
      </div>
      <select
        value={limit}
        className="pagination__limit"
        onChange={(e) => setLimit(+e.target.value)}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  );
};

export default Pagination;
