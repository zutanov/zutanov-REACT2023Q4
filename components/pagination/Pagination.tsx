import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/pagination.module.scss';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  setLimitPerPage,
  setOffsetPage,
} from '../../store/reducers/heroesSlice';

const Pagination: React.FC = () => {
  const { limit, offset, total } = useAppSelector((state) => state.heroes);
  const dispatch = useAppDispatch();
  const page = useRef(0);

  const history = useRouter();
  const pageQty = Math.ceil(total / limit);

  useEffect(() => {
    dispatch(setOffsetPage(1240));
    page.current = 0;
  }, [dispatch, limit]);

  useEffect(() => {
    const { query } = history;
    const offset = String(page.current / limit + 1);
    const url = {
      pathname: history.pathname,
      query: { ...query, offset: offset },
    };
    const newUrl = new URL(window.location.href);
    newUrl.search = new URLSearchParams(url.query).toString();
    window.history.replaceState({}, '', newUrl.href);
  }, [history, limit, offset, page]);

  const handleChange = (direction: string) => {
    if (direction === 'prev') {
      dispatch(setOffsetPage(offset - limit));
      page.current -= limit;
    } else {
      dispatch(setOffsetPage(offset + limit));
      page.current += limit;
    }
  };

  const handleClick = (idx: number) => {
    page.current = idx * limit;
    dispatch(setOffsetPage(1240 + page.current));
  };

  const disabledBtn = () => {
    return page.current >= total - limit;
  };

  if (total === 0) return null;

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__wrapper}>
        <button
          className={styles.pagination__btn}
          disabled={page.current ? false : true}
          onClick={() => handleChange('prev')}
        >
          Prev
        </button>
        <div className={styles.pagination__pages}>
          {Array.from({ length: pageQty }, (_, idx) => (
            <Link
              href={`/?offset=${idx + 1}`}
              className={`${
                page.current / limit === idx
                  ? `${styles.pagination__page} ${styles.active}`
                  : styles.pagination__page
              }`}
              key={idx + 1}
              onClick={() => handleClick(idx)}
            >
              {idx + 1}
            </Link>
          ))}
        </div>
        <button
          className={styles.pagination__btn}
          disabled={disabledBtn()}
          onClick={() => handleChange('next')}
        >
          Next
        </button>
      </div>
      <select
        value={limit}
        className={styles.pagination__limit}
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
