import React, { useState } from 'react';

const SigninForm = ({swapForm}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  
  const submitForm = (e) => {
    e.preventDefault();

    console.log(email, password);

    // login axios post here
  }


  return (
    <div className="signinForm">
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