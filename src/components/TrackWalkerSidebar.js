import React, {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import '../style/trackWalkerSidebar.scss'
import Nav from './Nav';

const TrackWalkerSidebar = () => {
  const auth = useContext(AuthContext);

  console.log('walk data,',auth.walkData )

  return (
    <aside className="trackWalkerSidebar">
      <h1>Unleashed</h1>
      <div>
        <div className="walker-info">
          <h1>Walker is coming!</h1>
          <div className="item-innerbox">
            <div className="img-container">
              <img src={auth.walkData.walker?.profile_image} alt="" />
            </div>  
            <div className="text-container">
              <h3>{auth.walkData.walker?.name}</h3>
              <p>Instructions:</p>
              <p>{auth.walkData.walks?.special_instruction} </p>
            </div>
          </div>
        </div>
        <div className="pet-info">
          <h1>Get ready {auth.walkData.pets?.name}!</h1>
          <div className="item-innerbox">
            <div className="img-container">
              <img src={auth.walkData.pets?.image} alt="" />
            </div>
            <div className="text-container">
              <h3>{auth.walkData.pets?.name}</h3>
              <p>
                <ol>
                    <li>
                        {auth.walkData.pets?.breed}
                    </li>
                    <li>
                    {auth.walkData.pets?.size}
                    </li>
                    <li>
                      {auth.walkData.pets?.age} Years old
                    </li>
                </ol>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Nav />
    </aside>
  )
}

export default TrackWalkerSidebar;