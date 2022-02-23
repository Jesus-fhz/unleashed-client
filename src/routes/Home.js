import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserPetList from '../components/UserPetList';
import WalkList from '../components/WalkList';
import Map from '../components/Map';
import FindWalkerModal from '../components/FindWalkerModal';
import '../style/home.scss'
import TrackWalkerSidebar from '../components/TrackWalkerSidebar';


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

  useEffect(() => {
    console.log(auth)
  }, [auth])
  return (
    <div className="home">
    {
      auth.user.user_type === "owner" 
      ?
      auth.status === "accepted" && auth.status === "ongoing"
      ?
      <TrackWalkerSidebar
      />
      :
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

      {
        auth.status !== "accepted" || auth.status !== "ongoing"
        ?
        <FindWalkerModal
          isFinding={isFinding}
          handleFind={handleFind}
        />
        :
        ""
      }

    </div>
  )
}

export default Home;