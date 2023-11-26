import {
  getRunningQueriesThunk,
  fetchAllHeroes,
} from '../services/HeroesService';
import { wrapper } from '../store/store';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const limit = +(context?.params?.limit || 21);
    const offset = +(context?.params?.offset || 1240);
    const search = (context?.params?.searchTerm || '') as string;

    await store.dispatch(fetchAllHeroes.initiate({ limit, offset, search }));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

const Index = () => {
  return <div></div>;
};

export default Index;
