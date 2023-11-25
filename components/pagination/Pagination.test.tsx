import { screen, waitFor, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/test-utils';
import MainLayout from '../../pages/layout';

describe('Pagination Component', () => {
  vi.mock('next/router', () => require('next-router-mock'));

  it('Updates URL query parameter when page changes', async () => {
    renderWithProviders(<MainLayout />);
    const user = userEvent.setup();
    const spyAnchorTag = vi.spyOn(user, 'click');
    const searchButton = screen.getByRole('button', { name: /Next/i });
    user.click(searchButton);
    expect(spyAnchorTag).toHaveBeenCalledOnce();

    waitFor(() => {
      expect(window.location.search).toBe('/?offset=2');
    });
  });
});
