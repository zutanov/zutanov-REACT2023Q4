import React from 'react';
import './comics.scss';
import { IComics } from '../../model/hero';

interface IComicsProps extends IComics {
  key: string;
}

const Comics: React.FC<IComicsProps> = ({ id, title, thumbnail }) => {
  return (
    <div key={id} className="comics">
      <img
        className="comics__img"
        src={thumbnail.path + '/portrait_xlarge.jpg'}
        alt={title}
      />
      <h4 className="comics__title">{title}</h4>
    </div>
  );
};

export default Comics;
