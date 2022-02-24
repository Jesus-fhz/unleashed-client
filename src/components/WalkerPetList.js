import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Nav from './Nav';
import '../style/userPetList.scss'


const WalkerPetList = () => {
  const auth = useContext(AuthContext);

  return (
      <>
        <div className="userPetList">
          <h1>Unleashed</h1>
          <div className="scroll-container">
            <ul>
              { auth.walkData !== undefined 
                ?
                <li>
                  <div className="item-innerbox">
                    <div className="img-container">
                      <img src={auth.walkData.pets.image}/>
                    </div>
                    <div className="text-container">
                      <h3>{auth.walkData.pets.name}</h3>
                      <p className="breed"> {auth.walkData.pets.breed}</p>
                      <p>
                            {auth.walkData.pets.size}
                      </p>
                      <p>
                          {auth.walkData.pets.age} Years old
                      </p>
                      <p>Address: there is a seed problem with the Addresses (no all dogs have them) </p>
                    </div>
                  </div>
                </li>
               :
               "Loading pet..."
             }
            </ul>
          </div>
          <Nav />
        </div>
      </>
  )
}

export default WalkerPetList;