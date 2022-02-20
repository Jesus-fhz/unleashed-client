import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const EditOwner = () => {

  // This returns a stateful value, and a function to update it. It's basically like creating a custom setState function.
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const authContext = useContext(AuthContext)

  console.log('THIS IS THE USER:', authContext.user)

  return(
    <div>Hello</div>
  )

}

export default EditOwner;