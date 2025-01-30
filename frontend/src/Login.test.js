import React, {useContext} from 'react';
import { render, getByText, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import UserContext from './UserContext';
import App from './App';

test('renders Login', ()  => {
  render(<MemoryRouter>
        <Login  />
    </MemoryRouter>);
});

test('shows log in page', () => {
  const {getByText} = render(
    <MemoryRouter initialEntries={['/login']}>
      <App  />
    </MemoryRouter>
    );
  const username = getByText('Username')
  const password = getByText('Password');
  expect(username).toBeInTheDocument()
  expect(password).toBeInTheDocument()
});

// test('can log in', () => {
//   const {getByText, getByLabelText} = render(
//     <MemoryRouter initialEntries={['/login']}>
//       <App  />
//     </MemoryRouter>
//     );
//     const usernameInput = getByLabelText('Username')
//     const passwordInput = getByLabelText('Password')
//     const btn = getByText('Log In!')
//     fireEvent.change(usernameInput, {target: {value: 'testuser'}})
//     fireEvent.change(passwordInput, {target: {value: 'password'}})
//     fireEvent.click(btn)
    // const day = getByText('Sunday')
    // expect(day).toBeInTheDocument()   

  // expect('Sunday').toBeInTheDocument()
// })

