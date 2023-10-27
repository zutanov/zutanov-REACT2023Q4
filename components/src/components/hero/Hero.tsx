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
        {this.props.results.map((el) => {
          return (
            <div className="hero" key={el.id}>
              <div className="hero__wrapper">
                <img
                  src={el.thumbnail.path + '/portrait_xlarge.jpg'}
                  alt={el.name}
                />
              </div>
              <div className="hero__wrapper">
                <h4 className="hero__title">{el.name}</h4>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
export default Hero;
