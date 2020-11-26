import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Login from '../components/Login';
import Admin from '../components/Admin';

const App = () => {
  return ( 
    <Router>
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login}/>
          <Route exact path='/admin' component={Admin}/>
        </Switch>
      </div>
    </Router>
  );
}
 
export default App;