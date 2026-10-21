import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home page hero', () => {
  render(<App />);
  expect(screen.getAllByRole('heading', { level: 1 }).length).toBeGreaterThan(0);
});
