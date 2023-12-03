import { configureStore, combineReducers } from '@reduxjs/toolkit';
import countriesSlice from './reducers/countriesSlice';
import formSlice from './reducers/formSlice';

const rootReducer = combineReducers({
  countries: countriesSlice,
  form: formSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
