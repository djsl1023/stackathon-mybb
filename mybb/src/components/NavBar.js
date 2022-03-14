import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <nav>
      <div id="logo">My Blob Buddy</div>
      <NavLink to="/" activeClassName="active-nav">
        Home
      </NavLink>
      <NavLink to="/blobs" activeClassName="active-nav">
        My Blobs
      </NavLink>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
