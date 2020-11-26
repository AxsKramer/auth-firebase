import React, {useState, useCallback} from 'react';
import {auth, db} from '../firebase';
import {withRouter} from 'react-router-dom';

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(null);
  const [esRegistro, setEsRegistro] = useState(true);

  const processingData = e => {
    e.preventDefault();
    if(!email.trim()){
      setError('Ingrese Email');
      return;
    }
    if(!pass.trim()){
      setError('Ingrese Password');
      return;
    }
    if(pass.length < 6){
      setError('Password debe ser mayor a 6 carácteres');
      return;
    }
    setError(null);
    if(esRegistro){
      registrar()
    }else{
      login()
    }
  }

  const login = useCallback(async () => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, pass);
      setEmail('');
      setPass('');
      setError(null);
      props.history.push('/admin');
    } catch (error) {
      setError(error.message)
    }
  }, [email, pass, props.history])

  const registrar = useCallback(async () => {

    try {
      const response = await auth.createUserWithEmailAndPassword(email, pass);
      await db.collection('usuarios').doc(response.user.email).set({
        email: response.user.email,
        uid: response.user.uid
      })
      setEmail('');
      setPass('');
      setError(null);
      props.history.push('/admin');
    } catch (error) {
      setError(error.message);
    }
  }, [email, pass, props.history])

  return ( 
    <div className="mt-5">
      <h3 className="text-center">
        {esRegistro ? 'Registro de usuarios' : 'Login de acceso'}
      </h3>
      <hr/>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <form onSubmit={processingData}>
            {
              error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )
            }
            <input 
              type="email" 
              className="form-control mb-2"
              placeholder="Ingrese Email"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <input 
              type="password" 
              className="form-control mb-2"
              placeholder="Ingrese Contraseña"
              onChange={e => setPass(e.target.value)}
              value={pass}
            />
            <button className="btn btn-lg btn-dark btn-block" type="submit">
              {
                esRegistro ? 'Registrarse' : 'Acceder'
              }
            </button>
            <button 
              className="btn btn-sm btn-info btn-block"
              type="button"
              onClick={() => setEsRegistro(!esRegistro)}
            >
              {
                esRegistro ? '¿Ya estas registrado?' : '¿No tienes cuenta?'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
 
export default withRouter(Login);