import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Login from '../components/Login';
import Admin from '../components/Admin';
import {auth} from '../firebase';

const App = () => {

  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      user ? setFirebaseUser(user) : setFirebaseUser(null);
    })
  }, [])

  return firebaseUser !== false ? ( 
    <Router>
      <div className="container">
        <Navbar userInfo={firebaseUser} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login}/>
          <Route exact path='/admin' component={Admin}/>
        </Switch>
      </div>
    </Router>
  ) : (
    <p>Loading ...</p>
  )
}
 
export default App;