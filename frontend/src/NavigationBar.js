import React, { useContext } from "react";
import "./NavigationBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext";

function NavigationBar({ doLogout }) {
  const currUser = useContext(UserContext) || null
  return (
    <div>
      <Navbar expand="md">
        <NavLink to="/" className="navbar-brand">
          Capstone 2
        </NavLink>
        
        <Nav className="ml-auto" navbar>
          {!currUser || currUser.username === undefined ? 

          // no current user
          <>
          <NavItem>
            <NavLink to="/signup">Sign Up</NavLink>
          </NavItem> 

          <NavItem>
            <NavLink to="/login">Log In</NavLink>
          </NavItem> 
          </>
          :

          // current user
          <>
          <NavItem>
            <NavLink to="/add-meal">Add Meal</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/search">Search</NavLink>
          </NavItem>
          <NavItem>
            <button onClick={doLogout} className="logout-btn">Log Out</button>
          </NavItem>
          </>
        }
              
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavigationBar;