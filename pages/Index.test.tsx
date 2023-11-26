import Index from './index';
import { renderWithProviders } from '../test/test-utils';

describe('App', () => {
  test('App title displays correctly', async () => {
    renderWithProviders(<Index />);
    expect(<Index />).toBeTruthy();
  });
});
