import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <NavLink to="/" exact={true}>Dashboard</NavLink>
  </header>
);

export default Header;
