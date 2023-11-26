import { createSlice } from '@reduxjs/toolkit';

interface searchState {
  searchTerm: string;
}

const initialState: searchState = {
  searchTerm: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;
export const { reducer: searchReducer } = searchSlice;

export type SearchSliceState = ReturnType<typeof searchReducer>;
