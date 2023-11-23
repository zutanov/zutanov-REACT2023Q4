import '../styles/global.scss';
import type { AppProps } from 'next/app';
import MainLayout from './layout';
import { wrapper } from '../store/store';

export function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default wrapper.withRedux(MyApp);
