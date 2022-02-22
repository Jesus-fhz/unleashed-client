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
                    console.log(data);
                    setWalks(data.walks);
                    setPets(data.pets)
                })
                .catch(error => console.log(error));

    },[])

    const getPetId = (pet_id)=>{
       return pets.filter(pet => pet_id === pet.id)
    }

    return (
        <>
        {   
            walks?.length > 0 && pets?.length > 0 ?
                <div className="userPetList">   
                    <h1>
                    <Link to="/">Unleashed</Link>
                    </h1>
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
                                        <Link to="/" className="editBtn">Accept</Link>
                                            <button className="logoutBtn">Cancel</button>
                                        </div>
                                    </li>
                                    
                                ))
                            }
                        </ul>
                    </div>
                    <Nav />           
                </div>
            :
            ""
            }
           
        </>
    )
  
}


export default WalkList;