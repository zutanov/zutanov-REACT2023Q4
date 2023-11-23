import {
  // PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { heroesReducer } from './reducers/heroesSlice';
import { marvelApi } from '../services/HeroesService';
import { setupListeners } from '@reduxjs/toolkit/query';
import { searchReducer } from './reducers/searchSlice';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  heroes: heroesReducer,
  search: searchReducer,
  [marvelApi.reducerPath]: marvelApi.reducer,
});

// export const makeStore = (preloadedState: PreloadedState<RootState>) => {
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(marvelApi.middleware);
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

setupListeners(makeStore().dispatch);

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
