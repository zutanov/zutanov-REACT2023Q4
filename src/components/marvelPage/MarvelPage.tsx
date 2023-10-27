import React, { ChangeEvent } from 'react';
import Search from '../search/Search';
import Heroes from '../heroes/Heroes';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

interface IPromise {
  results: IHero[];
}

export interface IHero {
  id: string;
  thumbnail: {
    path: string;
  };
  name: string;
}

export interface IState {
  loading: boolean;
  results: Array<IHero>;
  searchTerm: string;
  error: boolean;
}

class MarvelPage extends React.Component<object, IState> {
  state = {
    searchTerm: '',
    results: [],
    loading: true,
    error: false,
  };

  fetchData = async <T,>(query = 'limit=20&offset=200'): Promise<T> => {
    const baseURL = 'https://gateway.marvel.com/v1/public/characters?';
    try {
      const request = await fetch(
        `${baseURL}${query}&apikey=745c5a5a9b5aee2d133096deaf6e1260`
      );
      const response = await request.json();
      if (response.status !== 'Ok' || !response.data.results.length) {
        this.setState({ error: true });
        throw new Error(response.statusText);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  handleSearch = async (query?: string) => {
    const { results } = await this.fetchData<IPromise>(query);
    this.setState({
      results: results,
      loading: false,
    });
    if (this.state.searchTerm && results[0].name) {
      localStorage.setItem('hero', JSON.stringify(this.state.searchTerm));
    }
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchTerm: e.target.value });
  };

  async componentDidMount(): Promise<void> {
    const hero = localStorage.getItem('hero');
    const parse = hero ? JSON.parse(hero) : null;
    const query = parse ? `nameStartsWith=${parse}` : undefined;
    try {
      await this.handleSearch(query);
    } catch (error) {
      this.setState({ error: true });
      console.error(error);
    }
  }

  render(): React.ReactNode {
    return (
      <>
        <Search
          search={this.state.searchTerm}
          handleSearch={this.handleSearch}
          handleInputChange={this.handleInputChange}
        />
        <ErrorBoundary>
          <Heroes state={this.state} />
        </ErrorBoundary>
      </>
    );
  }
}
export default MarvelPage;
