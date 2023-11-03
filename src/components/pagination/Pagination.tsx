import { Link, useLocation, useNavigate } from 'react-router-dom';
import './pagination.scss';
import React, { useRef } from 'react';

interface PaginationProps {
  pages: number;
  handleSearch: (page?: string, limit?: number) => Promise<void>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  pages,
  handleSearch,
  limit,
  setLimit,
}: PaginationProps) => {
  const page = useRef(0);
  const history = useNavigate();
  const location = useLocation();
  const handleChange = async (direction: string) => {
    if (direction === 'prev') {
      page.current -= limit;
    } else {
      page.current += limit;
    }
    await handleSearch(`offset=${page.current}`, limit);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('offset', String(page.current / limit + 1));
    history(`?${searchParams.toString()}`);
  };

  const handleClick = async (idx: number) => {
    page.current = idx * limit;
    await handleSearch(`offset=${page.current}`, limit);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('offset', String(page.current / limit + 1));
    history(`?${searchParams.toString()}`);
  };

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
          {Array.from({ length: pages }, (_, idx) => (
            <Link
              to={'/'}
              className={`${
                page.current / limit === idx
                  ? 'pagination__page active'
                  : 'pagination__page'
              }`}
              key={idx + 1}
              onClick={() => handleClick(idx - 1)}
            >
              {idx + 1}
            </Link>
          ))}
        </div>
        <button
          className="pagination__btn"
          disabled={page.current > 100 - limit * 2 ? true : false}
          onClick={() => handleChange('next')}
        >
          Next
        </button>
      </div>
      <input
        className="pagination__limit"
        type="number"
        max={20}
        min={5}
        step={5}
        value={limit}
        onChange={(e) => setLimit(+e.target.value)}
      />
    </div>
  );
};

export default Pagination;
