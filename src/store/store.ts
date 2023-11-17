import { combineReducers, configureStore } from '@reduxjs/toolkit';
import heroesSlice from './reducers/heroesSlice';
import { marvelApi } from '../services/HeroesService';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  heroes: heroesSlice,
  [marvelApi.reducerPath]: marvelApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(marvelApi.middleware);
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

setupListeners(setupStore().dispatch);
