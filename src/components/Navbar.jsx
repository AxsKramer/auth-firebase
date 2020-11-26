import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const Navbar = () => (
  <div className="navbar navbar-dark bg-dark">
    <Link to="/" className="navbar-brand">React Admin</Link>
    <div>
      <div className="d-flex">
        <NavLink to="/" exact className="btn btn-dark mr-2" > Home </NavLink>
        <NavLink to="/admin" className="btn btn-dark mr-2" > Admin </NavLink>
        <NavLink to="/login" className="btn btn-dark" > Login </NavLink>
      </div>
    </div>
  </div>
)

 
export default Navbar;