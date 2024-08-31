import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MealCard from './MealCard';

test('renders MealCard', () => {
  render(<MemoryRouter><MealCard /></MemoryRouter>);

});