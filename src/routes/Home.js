import React, { useState } from 'react';
import UserPetList from '../components/UserPetList';
import Map from '../components/Map';
import '../style/home.scss'
import FindWalkerModal from '../components/FindWalkerModal';

const Home  = () => {
  const [isFinding, setIsFinding] = useState(false);
  
  const handleFind = () => {
    isFinding ? setIsFinding(false) : setIsFinding(true);
  }

  return (
    <>
      <div className={`home ${ isFinding ? "loading" : ""}`}>
        <UserPetList 
          handleFind={handleFind}
          isFinding={isFinding}
        />
        <Map isFinding={isFinding}/>
      </div>

      {/* loading screen */}
      <FindWalkerModal
        isFinding={isFinding}
        handleFind={handleFind}
      />
    </>
  )
}

export default Home;