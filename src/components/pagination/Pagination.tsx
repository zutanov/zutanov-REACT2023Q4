import { Link, useLocation, useNavigate } from 'react-router-dom';
import './pagination.scss';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  setLimitPerPage,
  setOffsetPage,
} from '../../store/reducers/heroesSlice';

const Pagination: React.FC = () => {
  const { limit, offset, total } = useAppSelector((state) => state.heroes);
  const page = useRef(0);
  const pageQty = Math.ceil(total / limit);
  const dispatch = useAppDispatch();

  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(setOffsetPage(1240));
    page.current = 0;
  }, [dispatch, limit]);

  const changeLocation = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('offset', String(page.current / limit + 1));
    history(`?${searchParams.toString()}`);
  };

  const handleChange = (direction: string) => {
    if (direction === 'prev') {
      dispatch(setOffsetPage(offset - limit));
      page.current -= limit;
    } else {
      dispatch(setOffsetPage(offset + limit));
      page.current += limit;
    }
    changeLocation();
  };

  const handleClick = (idx: number) => {
    page.current = idx * limit;
    dispatch(setOffsetPage(1240 + page.current));
    changeLocation();
  };

  const disabledBtn = () => {
    return page.current >= total - limit;
  };

  if (total === 0) return null;

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
        onChange={(e) => {
          dispatch(setLimitPerPage(e.target.value));
        }}
      >
        <option value="21">21</option>
        <option value="30">30</option>
        <option value="42">42</option>
      </select>
    </div>
  );
};

export default Pagination;
