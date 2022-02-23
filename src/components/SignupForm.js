import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../style/signinForm.scss'
import { postUserInfo } from '../services/users';

const SignupForm = ({swapForm}) => {
  const authContext = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [isWalker, setIsWalker] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true);

  const changeUserType = (e) => setIsWalker(!isWalker);
  const changeEmail = (e) => setEmail(e.target.value);
  const changeUsername = (e) => setUsername(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const changeAddress = (e) => setAddress(e.target.value)

  const changePasswordConfirm = (e) => {
    if(e.target.value >= password.length && e.target.value !== password) {
      setIsPasswordConfirmed(false);
    }else {
      setIsPasswordConfirmed(true);
    }
  }

  const submitForm = (e) => {
    e.preventDefault();

    if(!isPasswordConfirmed) return;

    let user_type = isWalker ? 'walker' : 'owner'

    console.log('email: ', email, 'username:', name, 'password: ', password, 'user-type:', user_type, 'address: ', address)

    postUserInfo({
      email, name, password, user_type, address
    })

    authContext.onSignUp({
      email, name, password, isWalker, address
    })
      .catch(() => setError(true));
  }


  return (
    // named this "signinForm" since styling is same
    <div className="signinForm">
      {/* {error || <p>Fail to signup</p>} */}
      <form onSubmit={(e) => submitForm(e)}>
        <div className='checkbox'>
          <label>Are you a dog walker?</label>
          <input 
            type="checkbox"
            checked={isWalker}
            onChange={(e) => changeUserType(e)}
          />
        </div>
        <div>
          <label>Email address</label>
          <input 
            required 
            type="text" 
            placeholder='Email'
            onChange={(e) => changeEmail(e)}
          />
        </div>
        <div>
          <label>Full Name</label>
          <input 
            required 
            type="text" 
            placeholder='Full Name' 
            onChange={(e) => changeUsername(e)}
          />
        </div>
        <div>
          <label>Address</label>
          <input 
            required 
            type="text" 
            placeholder='Address' 
            onChange={(e) => changeAddress(e)}
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            required 
            type="password" 
            placeholder='Password'
            onChange={(e) => changePassword(e)}
          />
          <input
            required 
            type="password" 
            placeholder='Confirm password'
            className={isPasswordConfirmed ? "" : "error"}
            onChange={(e) => changePasswordConfirm(e)}
          />
        </div>
        <button type="submit">SignUp</button>
      </form>
      <p className={error ? "error-msg active" : "error-msg"}>
          Fail to Sign up.
      </p>
      <button 
        className="signinBtn"
        onClick={() => swapForm(true)}
      >
        Do you already have an account?
      </button>
    </div>
  )
}

export default SignupForm;