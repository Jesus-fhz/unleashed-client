import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchUserInfo } from '../services/users';
import '../style/editProfile.scss';
import { Upload } from '../services/upload.js'
import axios from 'axios';

const EditOwner = ({handleSubmitter}) => {

  // This returns a stateful value, and a function to update it. It's basically like creating a custom setState function.
  const authContext = useContext(AuthContext)
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // specific state dealing with errors within the form & the state we are updating prior to submit
  const [nameError, setNameError] = useState({error: false, value: 'None'});
  const [addressError, setAddressError] = useState({error: 'None', value: null});
  const [profileImageError, setProfileImageError] = useState({error: 'None', value: null});
  const [emailError, setEmailError] = useState({error: 'None', value: null});

  // specific state dealing with whether or not the individual pieces of state have changed
  let [hasNameChanged, setHasNameChanged] = useState(false)
  let [hasProfileChanged, setHasProfileChanged] = useState(false)
  let [hasAddressChanged, setHasAddressChanged] = useState(false)
  let [hasEmailChanged, setHasEmailChanged] = useState(false)

  // a simple state that shows the user edits were pushed through successfully
  let [submitSuccess, setSubmitSuccess] = useState(false)

  // regex for valid profile image URL and emails for checking the form before we submit
  const VALID_URL_REGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  const VALID_EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  // for cloudinary
  const cloudName = process.env.REACT_APP_CLOUD_NAME; // replace with your own cloud name
  const uploadPreset = process.env.REACT_APP_CLOUD_PRESET; // replace with your own upload preset

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
  let [profile_image, setProfileImage] = useState(authContext.user.profile_image);
  let [name, setName] = useState('');
  let [address, setAddress] = useState('');
  let [email, setEmail] = useState('');
  
  // all of these are just handling an individual input in the rendered form
  const handleProfileImageChange = (e) => {
    // this is letting state know that this particular input has been changed
    setHasProfileChanged(true)
    // sets profile image in the state using the value from the input
    setProfileImage(e)
  } 

  const handleNameChange = (e) => {
    setHasNameChanged(true)
    setName(e.target.value)
  }  
  
  const handleAddressChange = (e) => {
    console.log(e.target.value)
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
    console.log(address)
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
            console.log('profile valid')
      return true
    } else {
      console.log('profile invalid')
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
    setSubmitSuccess(false)

    // this is where we check to see if that the piece of state has been updated at all on the page (I had to do this because it was returning *empty string* if I didn't put this further validation in). If it has been updated, it is taken as the image to pass to Axios. If it has NOT been updated, we take what is existing in the authContext.
    let id = authContext.user.id;
    name = hasNameChanged ? name : authContext.user.name
    email = hasEmailChanged ? email : authContext.user.email
    profile_image = hasProfileChanged ? profile_image : authContext.user.profile_image
    address = hasAddressChanged ? address : authContext.user.address  
    
    // This is the validation check and the if check that requires all the state and helper functions above to assess if a relevant value has been submitted to the form before we handleSubmitter() which is the axios patch request in EditProfile.js
    if (isNameValid(name) && isAddressValid(address) && isEmailValid(email) && isProfileImageValid(profile_image)) {
      console.log('ALL VALID - SUBMITTING FORM')
      console.log('this is the profile image in handleSubmitter: ', profile_image)
        handleSubmitter({
          profile_image, name, address, email, id
        });
        setSubmitSuccess(true)
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



    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        // cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        // multiple: false,  //restrict upload to a single file
        // folder: "user_images", //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images"], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          console.log(result.info.secure_url)
          handleProfileImageChange(result.info.secure_url)
        }
      }
    );

    function openWidget () {
      myWidget.open()
    }

  return(
    <>
      {
        loading === true
        ?
        <h1>Loading...</h1>
        :
        error === true
        ?
        <h1>Error!</h1>
        :
        <section className="ownerProfile">
          <div className="ownerProfile-innerbox">
          <h2>Edit Profile</h2>

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

            <form onSubmit={ (e) => handleSubmit(e) } >

              {/* Profile Image Section */}

              {/* Name Section */}
              <div>
                <p>Name</p>
                <p><input className='profileInput' onChange={ (e) => handleNameChange(e) } type="text" defaultValue={authContext.user.name} /></p>
              </div>

              {/* Address Section */}
              <div>
                <p>Address</p>
                <p><textarea rows="3" className='profileInput' onChange={ (e) => handleAddressChange(e) } type="text" defaultValue={authContext.user.address} /></p>
              </div>

              {/* Email Section */}
              <div>
                <p>Email</p>
                <p><input className='profileInput' onChange={ (e) => handleEmailChange(e) } key={'name'} type="text" defaultValue={authContext.user.email} /></p>
              </div>

              {/* Button Section */}
              <div className='btn-container' >
                <button type='submit'>Submit Changes</button>
              </div>

              <div>

                {nameError.error === true ? <p className={true ? "error-message" : null}>{nameError.value}</p> : null}

                {addressError.error === true ? <p className={true ? "error-message" : null}>{addressError.value}</p> : null}

                {profileImageError.error === true ? <p className={true ? "error-message" : null}>{profileImageError.value}</p> : null}

                {emailError.error === true ? <p className={true ? "error-message" : null}>{emailError.value}</p> : null}

                {submitSuccess ? <p className="success-message">Your profile has been edited successfully.</p> : null}
                
              </div>
            </form>
          </div>
        </section>
      }
    </>
  )

}

export default EditOwner;