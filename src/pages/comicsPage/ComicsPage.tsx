import './comicsPage.scss';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Comics from '../../components/comics/Comics';

export interface IComics {
  id: string;
  thumbnail: {
    path: string;
  };
  title: string;
}

export interface IComicsState {
  comics: IComics[];
}

const ComicsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comics, setComics] = useState<IComics[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getComics = async <T,>(): Promise<T> => {
    try {
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters/${id?.slice(
          1
        )}/comics?limit=9&apikey=745c5a5a9b5aee2d133096deaf6e1260`
      );
      const { data } = await response.json();
      setLoading(false);
      setComics(data.results);
      return data.results;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      e.target instanceof HTMLDivElement &&
      e.target.className === 'allcomics'
    ) {
      navigate(-1);
    }
  };

  useEffect(() => {
    try {
      getComics<IComicsState>();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="allcomics" onClick={handleClose}>
      <div
        className="allcomics__layout"
        style={{
          right: id ? '0%' : '-33%',
        }}
      >
        <div className="allcomics__header">
          <h1>List of Comics</h1>
          <Link to="/" className="allcomics__btn">
            Back
          </Link>
        </div>
        {loading ? (
          <h2 className="allcomics__empty">Loading...</h2>
        ) : !comics.length ? (
          <h2 className="allcomics__empty">There is no comics!</h2>
        ) : (
          <div className="allcomics__wrapper">
            <Comics comics={comics} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ComicsPage;
