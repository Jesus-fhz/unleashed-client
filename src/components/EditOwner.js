import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchUserInfo } from '../services/users';

const EditOwner = ({handleSubmitter}) => {

  // This returns a stateful value, and a function to update it. It's basically like creating a custom setState function.
  const authContext = useContext(AuthContext)
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // now I need to fetch user info when the component is rendered.
  // TODO: As we already have the information from the authcontext, the question is whether or not we need to fetch data on ComponentDidMount (managed by useEffect). Test this, especially at update.
  useEffect(() => {
    const userId = authContext.user.id;
    console.log('authContext.user:', authContext.user)
    
    // const changeName = (e) => setName(e.target.value);
    
    fetchUserInfo(userId)
      .then((data) => setData(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [authContext.user]);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (ev) => {
    ev.preventDefault()
    console.log(ev)
    handleSubmitter({name, email})
  }

  const handleNameChange = (ev) => {
    console.log(ev.target.value);
    setName(ev.target.value)
  }  
  
  const handleEmailChange = (ev) => {
    console.log(ev.target.value);
    setEmail(ev.target.value)
  }

  // a function that manages what happens on submit
  // TODO: an axios post request to the DB

  return(
    <>
      {
        loading === true && error === false
        ?
        <p>loading...</p>
        :
        loading === false && error === true
        ?
        <h1>ERROR!</h1>
        :
        <section className="ownerProfile">
          <div className="ownerProfile-innerbox">
          <h1>Edit Profile</h1>
            <form onSubmit={ (ev) => handleSubmit(ev) } >
              <label> Profile Image </label>
              {/* <input onChange={ (ev) => handleChange(ev) } type="text" defaultValue={data.profile_image} /> */}
              <br />
              <label> Name </label>
              <input onChange={ (ev) => handleNameChange(ev) } type="text" defaultValue={data.name} />
              <br />
              {/* <label> Address </label>
              <input onChange={ (ev) => handleChange(ev) } type="text" defaultValue={data.address} />
              <br /> */}
              <label> Email </label>
              <input onChange={ (ev) => handleEmailChange(ev) } key={'name'} type="text" defaultValue={data.email} />
              <br />
              <button type='submit'>I AM A BUTTON</button>
            </form>
          </div>
        </section>
      }
    </>
  )

}

export default EditOwner;