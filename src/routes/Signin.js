import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';
import '../style/signin.scss';

const Signin = () => {
  const [isSignin, setIsSignin] = useState(true);

  const swapForm = () => {
    isSignin ? setIsSignin(false) : setIsSignin(true);
  }

  return (
    <div className="signin">
      <div className="signin-innerbox">
        <h1>Unleashed</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec blandit purus.</p>
        {
          isSignin
          ?
          <SigninForm swapForm={swapForm} />
          :
          <SignupForm swapForm={swapForm} />
        }
      </div>
    </div>
  )
}

export default Signin;