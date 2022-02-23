import React, {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import '../style/trackWalkerSidebar.scss'

const TrackWalkerSidebar = () => {
  const auth = useContext(AuthContext);

  console.log(auth.walkData)

  return (
    <aside className="trackWalkerSidebar">
      <div className="walker-info">
        <h1>Walker is coming!</h1>
        {/* <h2>{auth.walkdata.walker.name}</h2> */}
      </div>
      <div className="pet-info">
        {/* <h1>Get ready {auth.walkData.pet.name}!</h1> */}
      </div>
    </aside>
  )
}

export default TrackWalkerSidebar;