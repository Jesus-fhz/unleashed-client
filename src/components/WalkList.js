import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { acceptWalk, getOwnerAddress, requestPendingWalks } from '../services/walk';
import Nav from './Nav';
    
const WalkList  = () => {
    const auth = useContext(AuthContext);
    const [walks,setWalks] = useState([]);
    const [status, setStatus] = useState('Accept');

    useEffect(() => {
        const ID = setInterval(() => {
            requestWalks();
        }, 3000);

        return () => clearInterval(ID);
    },[])

    const requestWalks = () => {
        requestPendingWalks(auth.user.latitude, auth.user.longitude)
        .then(data => setWalks(data.walks))
        .catch(error => console.log(error));
    }


    const clickAccept = (data) => {
        auth.changeStatus('accepted');
        auth.changeOngoingWalk(data.id);
        // console.log('the clickAccept data is:', data)
        auth.updateLocation({lat: data.latitude, lng: data.longitude})
        setWalks([data])
        setStatus('On going'); //This is just for display porpuses
        // We need Authcontext 
        //TODO: make it so that this changes the map for both the current Walker and Owner 
        const info = {
            walk_id: data.id,
            pet_id: data.pet_id,
            user_id: auth.user.id,
            status: 1,
            cost: data.cost,
            address: data.address,
            duration: data.duration,
            latitude: data.latitude,
            longitude: data.longitude
        }


        acceptWalk(info)
            .then(data => console.log(data));

        getOwnerAddress(data.id)
            .then((res) => { auth.updateDestination(res)
                console.log('sadasdasdasdsa,', res)
            });

        // WALKER SIDE: at the same time, we gonna set that geolocation in AuthContext.location
        // USER SIDE: we need to keep getting walker's location from API
    }

    return (
        <div className="userPetList">
            <h1>
            <Link to="/">Unleashed</Link>
            </h1>
            {
                walks?.length > 0
                ?
                <div className="scroll-container">
                    <ul>
                        {   
                        walks?.map((el, index)=>(
                                <li key={index}>
                                    <div className="item-innerbox">
                                        <div className="img-container">
                                            <img src={ el.pet.image } alt="" />
                                        </div>
                                        <div className="text-container">
                                            <h3> { el.pet.name } </h3>
                                            <p>
                                                {el.address}
                                            </p>
                                            <p className="breed">
                                                Walk Duration: {el.duration} mins
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-container">
                                        <h3> {el.pet.name} </h3>
                                        <p>
                                            {el.address}
                                        </p>
                                        <p className="breed">
                                            Walk Duration: {el.duration} mins
                                        </p>
                                    </div>
                                <div className="btn-container">
                                    <button 
                                        className="accept-btn"
                                        onClick={() => clickAccept(el)}
                                    >
                                        {status}
                                    </button>
                                </div>
                            </li>
                                
                            ))
                        }
                    </ul>
                </div>
                :
                <p className='noWalk-msg'>There is no walk yet.</p>
            }
            <Nav />         
        </div>
    )
}

export default WalkList;