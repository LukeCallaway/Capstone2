import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddMealForm from './AddMealForm';
import App from './App';

test('renders AddMealForm', () => {
  render(<MemoryRouter><AddMealForm /></MemoryRouter>);
});

test('shows sign up page', () => {
  const {getByText} = render(
    <MemoryRouter initialEntries={['/signup']}>
      <App  />
    </MemoryRouter>
    );
  const username = getByText('Username')
  const password = getByText('Password');
  const calorieTarget = getByText('Calorie Target');
  expect(username).toBeInTheDocument()
  expect(password).toBeInTheDocument()
  expect(calorieTarget).toBeInTheDocument()
})