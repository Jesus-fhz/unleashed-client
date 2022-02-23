import React, { useEffect, useState, useContext } from 'react';
import { getWalkInfo } from '../services/walk';
import { AuthContext } from '../context/AuthContext';


const TrackWalkerSidebar = () => {
  const auth = useContext(AuthContext);

  const [data, setData] = useState();

  useEffect(() => {
    // fetch data here
    getWalkInfo(auth.ongoingWalkID)
      .then(data => {
        setData(data)
      })
  }, []);

  return (
    <aside className="trackWalkerSidebar">
      <div className="walker-info">
        walker's info
      </div>
      <div className="pet-info">
        pet's information
      </div>
    </aside>
  )
}

export default TrackWalkerSidebar;