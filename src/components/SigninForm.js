import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const SigninForm = ({swapForm}) => {
  // this is an object that return all the state, and functions inside of "AuthContext"
  // by using ContextAPI, you can access this from everywhere without passing props all the way down.
  const authContext = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  
  const submitForm = (e) => {
    e.preventDefault();
    
    // when a user submit a login form, 
    // it'll call the function "onSignIn" in "authContext",
    // and this function will return promise.
    // if there was an error, setError(true), and let user know.
    authContext.onSignIn(email, password)
      .catch(() => setError(true));
  }


  return (
    <div className="signinForm">
      {error || <p>Fail to login</p>}
      <form onSubmit={(e) => submitForm(e)}>
        <input 
          required 
          type="text" 
          placeholder='Email'
          onChange={(e) => changeEmail(e)}
        />
        <input 
          required 
          type="password" 
          placeholder='Password'
          onChange={(e) => changePassword(e)}
        />
        <button type="submit">
          SignIn
        </button>
      </form>

      <button 
        className="signinBtn"
        onClick={() => swapForm(false)}
      >
        You don't have an account yet?
      </button>
    </div>
  )
}

export default SigninForm;