import React from 'react';
import './heroes.scss';
import Hero from '../hero/Hero';
import { IState } from '../marvelPage/MarvelPage';

interface Props {
  state: IState;
}

class Heroes extends React.Component<Props> {
  render() {
    const { results, loading } = this.props.state;
    return (
      <div className="heroes">
        {loading ? <p>Loading...</p> : <Hero results={results} />}
      </div>
    );
  }
}

export default Heroes;
