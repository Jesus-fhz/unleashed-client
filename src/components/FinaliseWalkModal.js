import React, {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import '../style/finaliseWalkModal.scss';

const FinaliseWalkModal = () => {
  const auth = useContext(AuthContext);

  const clickFinalise = () => {
    auth.changeStatus('finished');
  }

  return (
    <div className="finaliseWalkModal">
      <dialog>
        <h1>{auth.walkData.pets.name} is coming!</h1>
        <h2>Hope {auth.walkData.pets.name} had fun with {auth.walkData.walker.name}</h2>
        <button onClick={() => clickFinalise()}>
          I got {auth.walkData.pets.name}
        </button>
      </dialog>
    </div>
  )
}

export default FinaliseWalkModal;