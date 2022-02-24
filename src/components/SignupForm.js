import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../style/signinForm.scss'
import { postUserInfo } from '../services/users';

const SignupForm = ({swapForm}) => {
  const authContext = useContext(AuthContext);

  const cloudName = "metaverse-fc"; // replace with your own cloud name
  const uploadPreset = "unleashed"; // replace with your own upload preset

  const [error, setError] = useState(false);
  const [isWalker, setIsWalker] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [profile_image, setProfileImage] = useState('')
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true);

  const changeUserType = (e) => setIsWalker(!isWalker);
  const changeEmail = (e) => setEmail(e.target.value);
  const changeUsername = (e) => setUsername(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const changeAddress = (e) => setAddress(e.target.value)
  const changeProfileImage = (e) => setProfileImage(e)

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

    authContext.onSignUp({
      email, name, password, user_type, address, profile_image
    })
      .catch(() => setError(true));

      swapForm();
  }

  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        console.log(result.info.secure_url)
        changeProfileImage(result.info.secure_url)
      }
    }
  );

  function openWidget () {
    myWidget.open()
  }


  return (
    // named this "signinForm" since styling is same
    <div className="signinForm">
    <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript">  
    </script>
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

        <div className='img-container' >
          <img src={profile_image} alt="" />
        </div>

        <div className='btn-container' >
          <button 
            onClick={openWidget} 
            id="upload_widget" 
            className='cloudinary-button'>
              Upload Profile Image
          </button>
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