import Search from '../components/search/Search';
import Heroes from '../components/heroes/Heroes';
import Pagination from '../components/pagination/Pagination';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';

export default function MainLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <div id="root">
        <div className="container">
          <Search />
          {children}
          <Heroes />
          <Pagination />
        </div>
        <div className="container__img"></div>
      </div>
    </ErrorBoundary>
  );
}
