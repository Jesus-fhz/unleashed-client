import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../style/walkArriveModal.scss';

const WalkerArriveModal = () => {
  const auth = useContext(AuthContext);

  const clickYes = () => {
    auth.changeStatus("ongoing")
  }


  return (
    <>
      {
        <div className="walkArriveModal">
          <div className="walkArriveModal-innerbox">
            <h2>You are in {auth.walkData.pets.name}'s home now!</h2>
            <div className="img-container">
              <img src={auth.walkData.pets.image} alt={auth.walkData.pets.name} />
            </div>
            <h3>Did you meet {auth.walkData.pets.name}?</h3>
            <button onClick={() => clickYes()}>
              Yes!
            </button>
          </div>
        </div>
      }
    </>

  )
}

export default WalkerArriveModal;