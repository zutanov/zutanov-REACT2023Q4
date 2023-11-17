import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import heroesSlice from './reducers/heroesSlice';
import { marvelApi } from '../services/HeroesService';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  heroes: heroesSlice,
  [marvelApi.reducerPath]: marvelApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(marvelApi.middleware);
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

setupListeners(setupStore().dispatch);
