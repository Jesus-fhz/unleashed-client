import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';
import '../style/signin.scss';

const Signin = ({ onSignUp, onSignIn }) => {
  const [isSignin, setIsSignin] = useState(true);

  const swapForm = () => {
    isSignin ? setIsSignin(false) : setIsSignin(true);
  } 

  return (
    <div className="signin">
      <div className="signin-infoBox">
        <div className='signin-contents'>
          <h1>Unleashed</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec blandit purus.</p>
          <img src="" alt="" />
        </div>
      </div>
      <div className="signin-formBox">
        {
          isSignin
          ?
          <div className="signin-contents">
            <h1>Log in</h1>
            <SigninForm swapForm={swapForm} />
          </div>
          :
          <div className="signin-contents --signup">
            <h1>Sign up</h1>
            <SignupForm swapForm={swapForm} />
          </div>
        }
      </div>
    </div>
  )
}

export default Signin;