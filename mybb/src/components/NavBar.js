import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <nav>
      <div id="logo">MyBb</div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/AllBlobs">All Known Blobs</NavLink>
    </nav>
  );
};

export default Navbar;
