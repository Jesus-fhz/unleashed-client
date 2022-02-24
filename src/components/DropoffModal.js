import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const DropoffModal = () => {
  const auth = useContext(AuthContext);
  const [data, setData] = useState({});

  useEffect(() => {
    setData(auth.walkData);
    console.log(auth.walkData);
  }, [auth.walkData]);

  const clickYes = () => {
    auth.changeStatus("finished")
  }


  return (
    <>
      {
        data.walkers
        ?
        <div className="walkArriveModal">
          <h2>Your dog finished the walk! They are very happy now!</h2>
          <button onClick={() => clickYes()}>
            I got my dog
          </button>
        </div>
        : ""
      }
    </>

  )
}

export default DropoffModal;