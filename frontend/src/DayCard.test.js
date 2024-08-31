import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DayCard from './DayCard';
import App from './App'

test('renders DayCard', () => {
  render(<MemoryRouter><DayCard /></MemoryRouter>);

});