import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddMealForm from './AddMealForm';

test('renders AddMealForm', () => {
  render(<MemoryRouter><AddMealForm /></MemoryRouter>);

});