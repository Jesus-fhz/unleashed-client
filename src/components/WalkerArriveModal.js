import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const WalkerArriveModal = () => {
  const auth = useContext(AuthContext);
  const [data, setData] = useState({});

  useEffect(() => {
    setData(auth.walkData);
    console.log(auth.walkData);
  }, [auth.walkData]);

  const clickYes = () => {
    auth.changeStatus("ongoing")
  }


  return (
    <>
      {
        data.walkers
        ?
        <div className="walkArriveModal">
          <h2>Walker is arrived! Did you meet them?</h2>
          <button onClick={() => clickYes()}>
            Yes!
          </button>
        </div>
        : ""
      }
    </>

  )
}

export default WalkerArriveModal;