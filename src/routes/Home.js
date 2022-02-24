import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserPetList from '../components/UserPetList';
import WalkerPetList from '../components/WalkerPetList';
import WalkList from '../components/WalkList';
import Map from '../components/Map';
import FindWalkerModal from '../components/FindWalkerModal';
import WalkerArriveModal from '../components/WalkerArriveModal';
import DropoffModal from '../components/DropoffModal';
import TrackWalkerSidebar from '../components/TrackWalkerSidebar';
import '../style/home.scss'


const Home  = () => {
  const [isFinding, setIsFinding] = useState(false);
  // const [status, setStatus] = useState(0);
  const [showFindWalkerModal, setShowFindWalkerModal] = useState(true);
  const auth = useContext(AuthContext);


  useEffect(() => {
    if((auth.status === "accepted" || auth.status === "ongoing") && showFindWalkerModal === true){
      setShowFindWalkerModal(false);
    }

  }, [auth.status])

  const handleFind = () => {
    isFinding ? setIsFinding(false) : setIsFinding(true);
  }

  // const handleStatus = (status) => {
  //   setStatus(status)
  // }

  const ownerSidebar = () => {
    if(auth.status === "pending" || auth.status === "finished") {
      return <UserPetList 
        handleFind={handleFind}
        isFinding={isFinding}
        // status={status}
        // handleStatus={handleStatus}
      />
    }

    // TODO: 
    if(isFinding) {
      return <FindWalkerModal />
    }

    if(auth.status === "accepted" || auth.status === "ongoing") {
      return <TrackWalkerSidebar />
    }

    if(auth.status === "pickup") {
      return <>
        <TrackWalkerSidebar />
        <WalkerArriveModal />
      </>
    }

    if(auth.status === "dropoff") {
      return <>
        <TrackWalkerSidebar />
        <DropoffModal />
      </>
    }
  }

  const walkerSidebar = () => {
    if(auth.status === "pending" || auth.status === "finished") {
      return <WalkList/>
    }

    if(auth.status === "accepted" || auth.status === "ongoing") {
      return <WalkerPetList />
    }

    if(auth.status === "pickup") {
      return <>
        <WalkerPetList />
        <p>Checking if you got there...</p>
      </>
    }

    if(auth.status === "dropoff") {
      return <>
        <WalkerPetList />
        <p>Checking if you get the dog back.</p>
      </>
    }
  }

  return (
    <div className="home">
      {
        auth.user.user_type === "owner"
        ?
        ownerSidebar()
        :
        walkerSidebar()
      }

      <Map isFinding={isFinding} showRadar={showFindWalkerModal} />
    </div>
  )
}

export default Home;