import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchUserInfo } from '../services/users';

const EditOwner = ({handleSubmitter}) => {

  // This returns a stateful value, and a function to update it. It's basically like creating a custom setState function.
  const authContext = useContext(AuthContext)
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // specific state dealing with errors within the form & the state we are updating prior to submit
  const [nameError, setNameError] = useState({error: 'None', value: null});
  const [addressError, setAddressError] = useState({error: 'None', value: null});
  const [profileImageError, setProfileImageError] = useState({error: 'None', value: null});
  const [emailError, setEmailError] = useState({error: 'None', value: null});

  // specific state dealing with whether or not the individual pieces of state have changed
  let [hasNameChanged, setHasNameChanged] = useState(false)
  let [hasProfileChanged, setHasProfileChanged] = useState(false)
  let [hasAddressChanged, setHasAddressChanged] = useState(false)
  let [hasEmailChanged, setHasEmailChanged] = useState(false)

  // regex for valid profile image URL and emails for checking the form before we submit
  const VALID_URL_REGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  const VALID_EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  // now I need to fetch user info when the component is rendered.
  // TODO: As we already have the information from the authcontext, the question is whether or not we need to fetch data on ComponentDidMount (managed by useEffect). Test this, especially at update.
  useEffect(() => {
    const userId = authContext.user.id;
    
    fetchUserInfo(userId)
      .then((data) => setData(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [authContext.user]);
  
  // These cannot be in the ComponentDidMount / useEffect
  let [profile_image, setProfileImage] = useState('');
  let [name, setName] = useState('');
  let [address, setAddress] = useState('');
  let [email, setEmail] = useState('');
  
  // all of these are just handling an individual input in the rendered form
  const handleProfileImageChange = (e) => {
    // this is letting state know that this particular input has been changed
    setHasProfileChanged(true)
    // sets profile image in the state using the value from the input
    setProfileImage(e.target.value)
  } 

  const handleNameChange = (e) => {
    setHasNameChanged(true)
    setName(e.target.value)
  }  
  
  const handleAddressChange = (e) => {
    setHasAddressChanged(true)
    setAddress(e.target.value)
  }

  const handleEmailChange = (e) => {
    setHasEmailChanged(true)
    setEmail(e.target.value)
  }

  // the beginning of my validation checks (PRE-SUBMIT) that I am using to assess certain conditions as a minimum before they are submitted via an Axios patch to the server.
  const isNameValid = (name) => {
    if (name.length > 3) {
      return true
    } else {
      return false
    }
  }  
  
  const isAddressValid = (address) => {
    if (address.length > 10) {
      return true
    } else {
      return false
    }
  }

  const isEmailValid = (email) => {
    if (email
      .toLowerCase()
      .match(VALID_EMAIL_REGEX)) {
      return true
    } else {
      return false
    }
  }

  const isProfileImageValid = (profileImage) => {
    if (profileImage
          .toLowerCase()
          .match(VALID_URL_REGEX)) {
      return true
    } else {
      return false
    }
  }

  // this is what happens when I press submit
  const handleSubmit = (e) => {
    // this stops the button refreshing the page (it's default HTML behaviour)
    e.preventDefault()

    // this is resetting error states for each input to ensure messages do not stay static at the bottom of the form after 1 attempt to edit profile
    setNameError({error: false, value: 'None'})
    setAddressError({error: false, value: 'None'})
    setProfileImageError({error: false, value: 'None'})
    setEmailError({error: false, value: 'None'})

    // this is where we check to see if that the piece of state has been updated at all on the page (I had to do this because it was returning *empty string* if I didn't put this further validation in). If it has been updated, it is taken as the image to pass to Axios. If it has NOT been updated, we take what is existing in the authContext.
    let id = authContext.user.id;
    name = hasNameChanged ? name : authContext.user.name
    email = hasEmailChanged ? email : authContext.user.email
    profile_image = hasProfileChanged ? profile_image : authContext.user.profile_image
    address = hasAddressChanged ? address : authContext.user.address  
    
    // This is the validation check and the if check that requires all the state and helper functions above to assess if a relevant value has been submitted to the form before we handleSubmitter() which is the axios patch request in EditProfile.js
    if (isNameValid(name) && isAddressValid(address) && isEmailValid(email) && isProfileImageValid(profile_image)) {
      console.log('ALL VALID - SUBMITTING FORM')
        handleSubmitter({
          profile_image, name, address, email, id
        });
      } 
      if (isProfileImageValid(profile_image) === false) {
        setProfileImageError({error: true, value: 'That does not look like an image URL! Please try again.' })
      }
      if (isEmailValid(email) === false) {
        setEmailError({error: true, value: 'That is not a valid e-mail. Please try again.' })
      }
      if (isAddressValid(address) === false) {
        setAddressError({error: true, value: 'The address you have entered is not valid. It must be longer than 10 characters.'})
      }
      if (isNameValid(name) === false){
        setNameError({error: true, value: 'The name you have entered is not valid. It must be longer than 3 characters.'})
      }
    };

  return(
    <>
      {
        loading === true
        ?
        <h1>IS LOADING</h1>
        :
        error === true
        ?
        <h1>Error!</h1>
        :
        <section className="ownerProfile">
          <div className="ownerProfile-innerbox">
          <h1>Edit Profile</h1>
            <form onSubmit={ (e) => handleSubmit(e) } >
              <label> Profile Image </label>
              <input onChange={ (e) => handleProfileImageChange(e) } type="text" defaultValue={authContext.user.profile_image} />
              <br />
              <label> Name </label>
              <input onChange={ (e) => handleNameChange(e) } type="text" defaultValue={authContext.user.name} />
              <br />
              <label> Address </label>
              <input onChange={ (e) => handleAddressChange(e) } type="text" defaultValue={authContext.user.address} />
              <br />
              <label> Email </label>
              <input onChange={ (e) => handleEmailChange(e) } key={'name'} type="text" defaultValue={authContext.user.email} />
              <br />
              <button type='submit'>I AM A BUTTON</button>
              <br />
              {nameError.value !== 'None' ? <h1 className="error-message">{nameError.value}</h1> : null}
              {addressError.value !== 'None' ? <h1 className="error-message">{addressError.value}</h1> : null}
              {profileImageError.value !== 'None' ? <h1 className="error-message">{profileImageError.value}</h1> : null}
              {emailError.value !== 'None' ? <h1 className="error-message">{emailError.value}</h1> : null}
            </form>
          </div>
        </section>
      }
    </>
  )

}

export default EditOwner;