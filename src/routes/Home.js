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
  const [showFindWalkerModal, setShowFindWalkerModal] = useState(true);
  const auth = useContext(AuthContext);


  useEffect(() => {
    console.log("auth.status is changed");

    if((auth.status === "accepted" || auth.status === "ongoing") && showFindWalkerModal === true){
      setShowFindWalkerModal(false);
    }
  }, [auth.status])

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
      !showFindWalkerModal
      ?
      <TrackWalkerSidebar />
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
        showFindWalkerModal
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