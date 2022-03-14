import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <nav>
      <div id="logo">My Blob Buddy</div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/blobs" activeClassName="active-nav">
        All Known Blobs
      </NavLink>
    </nav>
  );
};

export default Navbar;
