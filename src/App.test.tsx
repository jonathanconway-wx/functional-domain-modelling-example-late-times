import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';

import App from './App';

test('renders learn react link', async () => {
  render(<App />);
  waitFor(() => screen.findByTestId('table'));
});
