import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchUserInfo } from '../services/users';

const EditOwner = () => {

  // This returns a stateful value, and a function to update it. It's basically like creating a custom setState function.
  const authContext = useContext(AuthContext)
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  console.log('authContext.user:', authContext.user)

  // now I need to fetch user info when the component is rendered
  // useEffect(() => {
  //   const userId = authContext.user.id;

  //   fetchUserInfo(userId)
  //     .then((data) => setData(data))

  // })

  return(
    <div>This is the div inside of the return in EditOwner</div>
  )

}

export default EditOwner;