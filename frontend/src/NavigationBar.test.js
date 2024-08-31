import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar';

test('renders NavigationBar', () => {
  render(<MemoryRouter><NavigationBar /></MemoryRouter>);

});