import React, {useContext} from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import UserContext from './UserContext';

const currUser='lucas'

test('renders Login', ()  => {
  render(<MemoryRouter>
        <UserContext.Provider value={currUser}>
        <Login  />
    </UserContext.Provider>
    </MemoryRouter>);

});