import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import Search from './Search';

test('renders AddMealForm', () => {
  render(<MemoryRouter><Search /></MemoryRouter>);
});

test("shows doesn't show search page with no user", () => {
  const {queryByText} = render(
    <MemoryRouter initialEntries={['/search']}>
        <App  />
    </MemoryRouter>
    );
  const mealSearch = queryByText('Search By Meal Name')
  expect(mealSearch).not.toBeInTheDocument()
})
