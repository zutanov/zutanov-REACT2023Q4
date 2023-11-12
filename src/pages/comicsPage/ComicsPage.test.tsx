import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ComicsPage from './ComicsPage';
import userEvent from '@testing-library/user-event';

describe('Comics Component', () => {
  it('displays a loading indicator while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/comics/:1011334']}>
        <ComicsPage />
      </MemoryRouter>
    );
    expect(screen.getByText('List of Comics')).toBeInTheDocument();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    waitFor(() => {
      expect(screen.getByText('Loading...')).toBeNull();
    });
  });

  it('close Comics page by click the button', async () => {
    render(
      <MemoryRouter initialEntries={['/comics/:1011334']}>
        <ComicsPage />
      </MemoryRouter>
    );
    userEvent.click(screen.getByText('Back'));
    expect(screen.getByText('List of Comics')).toBeInTheDocument();
  });
});
