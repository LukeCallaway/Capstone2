import React, { useContext } from "react";
import "./NavigationBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext";
import { redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";

function NavigationBar({ doLogout }) {
  const currUser = useContext(UserContext)
  return (
    <div>
      <Navbar expand="md">
        <NavLink to="/" className="navbar-brand">
          Capstone 2
        </NavLink>
        
        <Nav className="ml-auto" navbar>
          {!currUser.username ? 
          <>
          <NavItem>
            <NavLink to="/signup">Sign Up</NavLink>
          </NavItem> 

          <NavItem>
            <NavLink to="/login">Log In</NavLink>
          </NavItem> 
          </>
          :
          <>
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