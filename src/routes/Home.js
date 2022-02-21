import React, { useState } from 'react';
import UserPetList from '../components/UserPetList';
import Map from '../components/Map';
import '../style/home.scss'

const Home  = () => {
  const [isFinding, setIsFinding] = useState(false);
  
  const handleFind = () => {
    isFinding ? setIsFinding(false) : setIsFinding(true);
  }
  return (
    <div className="home">
      <UserPetList 
        handleFind={handleFind}
        isFinding={isFinding}
      />
      <Map isFinding={isFinding}/>
    </div>
  )
}

export default Home;