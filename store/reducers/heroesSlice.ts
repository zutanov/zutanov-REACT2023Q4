import { createSlice } from '@reduxjs/toolkit';

interface HeroesState {
  limit: number;
  offset: number;
  total: number;
}

const initialState: HeroesState = {
  limit: 21,
  offset: 1240,
  total: 0,
};

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setLimitPerPage(state, action) {
      state.limit = +action.payload;
    },
    setOffsetPage(state, action) {
      state.offset = action.payload;
    },
    setTotalPage(state, action) {
      state.total = action.payload;
    },
  },
});

export const { setLimitPerPage, setOffsetPage, setTotalPage } =
  heroesSlice.actions;
export const { reducer: heroesReducer } = heroesSlice;

export type HeroesSliceState = ReturnType<typeof heroesReducer>;
