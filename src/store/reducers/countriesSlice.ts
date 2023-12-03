import { createSlice } from '@reduxjs/toolkit';
import { countries } from '../../data/country';

interface ICountry {
  countries: string[];
  selectedCountry: string;
}

const initialState: ICountry = {
  countries,
  selectedCountry: '',
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountry(state, action) {
      state.selectedCountry = action.payload;
    },
  },
});

export const { setCountry } = countriesSlice.actions;
export default countriesSlice.reducer;
