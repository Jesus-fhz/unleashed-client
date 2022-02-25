import React, {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import '../style/walkArriveModal.scss';

const FinishModal = () => {
  const auth = useContext(AuthContext);

  const clickFinish = () => {
    auth.changeStatus('pending');
  }

  return (
    <div className="walkArriveModal">
      <div className="walkArriveModal-innerbox">
        <h1>The pet had lovely time!</h1>
        <h2>Thank you for using our service.</h2>
        <button onClick={() => clickFinish()}>
          Finish
        </button>
      </div>
    </div>
  )
}

export default FinishModal;