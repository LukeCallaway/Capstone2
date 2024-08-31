import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders app', () => {
  render(<MemoryRouter> <App /> </MemoryRouter>);

});
