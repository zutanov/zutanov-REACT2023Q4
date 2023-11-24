import {
  getRunningQueriesThunk,
  fetchAllHeroes,
} from '../services/HeroesService';
import { wrapper } from '../store/store';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const limit = +(context?.params?.limit || 21);
    const offset = +(context?.params?.offset || 1240);

    await store.dispatch(fetchAllHeroes.initiate({ limit, offset }));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

const Index = () => {
  return;
};

export default Index;
