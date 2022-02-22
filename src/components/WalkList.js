import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestPendingWalks } from '../services/walk';
import Nav from './Nav';
    
const WalkList  = () => {
    const [walks,setWalks] = useState([]);
    const [pets,setPets] = useState([]);
    

    useEffect(() => {
        requestPendingWalks()
            .then(data => {
                setWalks(data.walks);
                setPets(data.pets)
            })
            .catch(error => console.log(error));
    },[])

    const getPetId = (pet_id) => {
       return pets.filter(pet => pet_id === pet.id);
    }

    const clickAccept = (id) => {
        console.log("accept walk - id: ", id);
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
                                            <p className="breed">
                                                Walk Duration: {el.duration} mins
                                            </p>
                                        </div>
                                    </div>
                                    <div className="btn-container">
                                        <button 
                                            className="accept-btn"
                                            onClick={(el) => clickAccept(el.id)}
                                        >
                                            Accept
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