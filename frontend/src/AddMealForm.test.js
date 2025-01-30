import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddMealForm from './AddMealForm';
import App from './App';

test('renders AddMealForm', () => {
  render(<MemoryRouter><AddMealForm /></MemoryRouter>);
});

test("shows doesn't show add meal page with no user", () => {
  const {queryByText} = render(
    <MemoryRouter initialEntries={['/add-meal']}>
        <App  />
    </MemoryRouter>
    );
  const mealSearch = queryByText('Breakfast')
  expect(mealSearch).not.toBeInTheDocument()
})