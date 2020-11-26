import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {auth} from '../firebase';
import {withRouter} from 'react-router-dom';

const Navbar = ({userInfo, history}) => {

  const logout = () => {
    auth.signOut()
      .then(() =>  history.push('/login'))
      .catch(error => console.log(error));
  }

  return (
    <div className="navbar navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">React Admin</Link>
      <div>
        <div className="d-flex">
          <NavLink to="/" exact className="btn btn-dark mr-2" > Home </NavLink>
          {
            userInfo !== null 
            ? (
              <>
              <NavLink to="/admin" className="btn btn-dark mr-2" > Admin </NavLink>
              <button onClick={() => logout()} className="btn btn-dark">Logout</button>
              </>
            )
              : <NavLink to="/login" className="btn btn-dark" > Login </NavLink>
          }
        </div>
      </div>
    </div>
  )
}

 
export default withRouter(Navbar);