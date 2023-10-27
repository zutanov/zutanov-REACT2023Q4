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
}

class MarvelPage extends React.Component<object, IState> {
  state = {
    searchTerm: '',
    results: [],
    loading: true,
  };

  fetchData = async <T,>(query = 'limit=20&offset=200'): Promise<T> => {
    const baseURL = 'http://gateway.marvel.com/v1/public/characters?';
    const request = await fetch(
      `${baseURL}${query}&apikey=745c5a5a9b5aee2d133096deaf6e1260`
    );
    let response;
    try {
      response = await request.json();
      if (response.code !== 200 || !response.data.results.length) {
        throw new Error(response.statusText);
      }
      const { data } = response;
      return data;
    } catch (error) {
      console.log(error);
    }

    return response;
  };

  handleSearch = async (query?: string) => {
    const data = await this.fetchData<IPromise>(query);
    this.setState({
      results: data.results,
      loading: false,
    });
    console.log(this.state);
    if (this.state.searchTerm && data.results[0].name) {
      localStorage.setItem('hero', JSON.stringify(this.state.searchTerm));
    }
  };

  async componentDidMount(): Promise<void> {
    const hero = localStorage.getItem('hero');
    const parse = hero ? JSON.parse(hero) : null;
    const query = `nameStartsWith=${parse}`;
    if (query) {
      this.handleSearch(query);
    } else {
      this.handleSearch();
    }
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchTerm: e.target.value });
  };

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
