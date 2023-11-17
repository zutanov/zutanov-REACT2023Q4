import { createSlice } from '@reduxjs/toolkit';
import { IHero } from '../../model/hero';

interface HeroesState {
  heroes: IHero[];
  isLoading: boolean;
  searchTerm: string;
  limit: number;
  offset: number;
  total: number;
}

const initialState: HeroesState = {
  heroes: [],
  isLoading: false,
  searchTerm: '',
  limit: 20,
  offset: 1240,
  total: 0,
};

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setLimitPerPage(state, action) {
      state.limit = +action.payload;
    },
    setOffsetPage(state, action) {
      state.offset = action.payload;
    },
    setTotalPage(state, action) {
      state.total = action.payload;
    },
    setIsLoading(state, action) {
      state.total = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  setLimitPerPage,
  setOffsetPage,
  setTotalPage,
  setIsLoading,
} = heroesSlice.actions;
export default heroesSlice.reducer;
