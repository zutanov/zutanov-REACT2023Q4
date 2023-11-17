import React from 'react';
import './hero.scss';
import { Link } from 'react-router-dom';
import { IHero } from '../../model/hero';

interface IHeroProps extends IHero {
  key: string;
}

const Hero: React.FC<IHeroProps> = ({ id, name, thumbnail }) => {
  return (
    <>
      <div className="hero" key={id}>
        <div className="hero__wrapper">
          <img
            className="hero__image"
            src={thumbnail.path + '/portrait_xlarge.jpg'}
            alt={name}
          />
        </div>
        <div className="hero__wrapper">
          <h4 className="hero__title">{name}</h4>
          <Link className="hero__link" to={`comics/:${id}`}>
            Show comics
          </Link>
        </div>
      </div>
    </>
  );
};
export default Hero;
