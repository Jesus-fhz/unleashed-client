import React from 'react';
import UserPetList from '../components/UserPetList';
import Map from '../components/Map';
import '../style/home.scss'

const Home  = () => {
  return (
    <div className="home">
      <UserPetList />
      <Map />
    </div>
  )
}

export default Home;