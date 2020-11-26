import React, {useEffect, useState} from 'react';
import {auth} from '../firebase';
import {withRouter} from 'react-router-dom';

const Admin = () => {

  const [user,setUser] = useState(null);

  useEffect(() => {
    if(auth.currentUser){
      setUser(auth.currentUser)
    }else{
      props.history.push('/login');
    }
  }, [])

  return ( 
    <div>
      <h1>Admin</h1>
      <h3>{user && user.email}</h3>
    </div>
  );
}
 
export default withRouter(Admin);
