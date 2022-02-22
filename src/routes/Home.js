import React, { useContext, useEffect, useState } from 'react';
import UserPetList from '../components/UserPetList';
import Map from '../components/Map';
import '../style/home.scss'
import WalkList from '../components/WalkList';
import { AuthContext } from '../context/AuthContext';

const Home  = () => {
  const [isFinding, setIsFinding] = useState(false);
  const [status, setStatus] = useState(0);
  const auth = useContext(AuthContext);
  const handleFind = () => {
    isFinding ? setIsFinding(false) : setIsFinding(true);
  }

  const handleStatus = (status) => {
    setStatus(status)
  }
  return (
    <div className="home">
    {
      auth.user.user_type === "owner" 
      ?
      <UserPetList 
        handleFind={handleFind}
        isFinding={isFinding}
        status={status}
        handleStatus={handleStatus}
      />
      :
      
      <WalkList/>
    }
      
      <Map isFinding={isFinding}/>
    </div>
  )
}

export default Home;