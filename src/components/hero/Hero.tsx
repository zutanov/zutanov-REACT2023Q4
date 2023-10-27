import React from 'react';
import './hero.scss';
import { IHero } from '../marvelPage/MarvelPage';

interface IResult {
  results: IHero[];
}

class Hero extends React.Component<IResult> {
  render() {
    return (
      <>
        {this.props.results.map(({ id, name, thumbnail }) => {
          return (
            <div className="hero" key={id}>
              <div className="hero__wrapper">
                <img src={thumbnail.path + '/portrait_xlarge.jpg'} alt={name} />
              </div>
              <div className="hero__wrapper">
                <h4 className="hero__title">{name}</h4>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
export default Hero;
