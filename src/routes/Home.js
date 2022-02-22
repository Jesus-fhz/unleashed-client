import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserPetList from '../components/UserPetList';
import WalkList from '../components/WalkList';
import Map from '../components/Map';
import FindWalkerModal from '../components/FindWalkerModal';
import '../style/home.scss'


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
        {/* loading screen */}
        <FindWalkerModal
          isFinding={isFinding}
          handleFind={handleFind}
        />
    </div>
  )
}

export default Home;