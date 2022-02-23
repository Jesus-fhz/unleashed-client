import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchUserPets } from '../services/pets';
import Nav from './Nav';
import '../style/userPetList.scss'


const WalkerPetList = () => {
  const authContext = useContext(AuthContext);

  return (
      <>
        <div className="userPetList">
          {/* <h1>Unleashed</h1>
          <div className="scroll-container">
            <ul>
              {pets.map((pet) => (
                <li key={pet.id}>
                  <div className="item-innerbox">
                    <div className="img-container">
                      <img src={pet.image} alt={pet.name} />
                    </div>
                    <div className="text-container">
                      <h3>{pet.name}</h3>
                      <p className="breed">{pet.breed}, {pet.age} Years old</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Nav /> */}
        </div>
      </>
  )
}

export default WalkerPetList;