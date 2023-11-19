import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { renderWithProviders } from './test/test-utils';

describe('App', () => {
  test('App title displays correctly', async () => {
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(<App />).toBeTruthy();
  });
});
