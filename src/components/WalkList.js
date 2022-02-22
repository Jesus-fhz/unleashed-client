import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { acceptWalk, requestPendingWalks } from '../services/walk';
import Nav from './Nav';
    
const WalkList  = () => {
    const auth = useContext(AuthContext);
    const [walks,setWalks] = useState([]);
    const [pets,setPets] = useState([]);
    const [status, setStatus] = useState('Accept');
    

    useEffect(() => {
        //const ID = setInterval(() => {
            requestWalks();
            console.log("updating walks...");
        //}, 3000);

        //return () => clearInterval(ID);
    },[])

    const requestWalks = () => {
        requestPendingWalks(auth.user.latitude, auth.user.longitude)
        .then(data => {
            setWalks(data.walks);
            setPets(data.pets)
        })
        .catch(error => console.log(error));
    }

    const getPetId = (pet_id) => {
       return pets.filter(pet => pet_id === pet.id);
    }

    const clickAccept = (data) => {
        const currentWalk = [data];
        setWalks(currentWalk)
        setStatus('On going');
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



        // //TODO: connect to accept walk endpoint
        // acceptWalk(info)
        //     .then(data => console.log(data))
        //     //TODO: we need show them a map (track walkers position) to Both side.
        //     // how are we gonna start pulling every 1sec
        //     // start whenever the state is changed?
    }

    return (
        <div className="userPetList">
            <h1>
            <Link to="/">Unleashed</Link>
            </h1>
            {
                walks?.length > 0 && pets?.length > 0 
                ?
                <div className="scroll-container">
                    <ul>
                        {   
                        walks?.map((el, index)=>(
                                <li key={index}>
                                    <div className="item-innerbox">
                                        <div className="img-container">
                                            <img src={getPetId(el.pet_id)[0].image} alt="" />
                                        </div>
                                        <div className="text-container">
                                            <h3> {getPetId(el.pet_id)[0].name} </h3>
                                            <p>
                                                {/* TODO: we need to get a users address */}
                                                {el.address}
                                            </p>
                                            <p className="breed">
                                                Walk Duration: {el.duration} mins
                                            </p>
                                        </div>
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