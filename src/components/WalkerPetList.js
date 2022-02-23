import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Nav from './Nav';
import '../style/userPetList.scss'


const WalkerPetList = () => {
  const auth = useContext(AuthContext);

  console.log(auth.walkData, 'ASDAS' ) 

  return (
      <>
        <div className="userPetList">
          <h1>Unleashed</h1>
          <div className="scroll-container">
            <ul>
              {
                <li>
                  <div className="item-innerbox">
                    <div className="img-container">
                      <img src={auth.walkData.pets.image}/>
                    </div>
                    <div className="text-container">
                      <h3>{auth.walkData.pets.name}</h3>
                      <p className="breed"> sad Years old</p>
                    </div>
                  </div>
                </li>
             }
            </ul>
          </div>
          <Nav />
        </div>
      </>
  )
}

export default WalkerPetList;