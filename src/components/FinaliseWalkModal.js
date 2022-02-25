import React, {useContext, useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import '../style/finaliseWalkModal.scss';

const FinaliseWalkModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const auth = useContext(AuthContext);

  const clickFinalise = () => {
    setIsOpen(false);
  }

  return (
    <>
      {
        isOpen ?
        <div className="finaliseWalkModal">
        <dialog>
          <h1>{auth.walkData.pets.name} is home!</h1>
          <h2>Hope you had fun with {auth.walkData.pets.name}</h2>
          <button onClick={() => clickFinalise()}>
            {auth.walkData.pets.name} is home now
          </button>
        </dialog>
      </div>
      : ""
      }
    </>

  )
}

export default FinaliseWalkModal;