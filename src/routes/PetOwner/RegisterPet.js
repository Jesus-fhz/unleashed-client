import React, { useState, useEffect } from 'react';
import { PetRegisterFormFirst, PetRegisterFormSecond } from '../../components/PetRegisterForm';
import '../../style/registerPet.scss'

import axios from 'axios';

const ResisterPet = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [petInfo, setPetInfo] = useState({});

  const changePage = (page) => {
    setCurrentPage(page);
  }

  const submitFirstForm = (info) => {
    setPetInfo({...petInfo, ...info});
  }

  const submitSecondForm = (info) => {
    setPetInfo({...petInfo, ...info});

    // actual api request
    createNewPet({...petInfo, ...info});
  }

  const createNewPet = async (pet)=>{
    try {
      const result =  await axios.post('http://localhost:3000/pets.json',{
          user_id: 21,
          image: "http://placedog.com/300/300",
          name: pet.name, 
          breed: pet.breed,
          age: pet.age,
          is_male: pet.gender,
          size: pet.size,
          desexed: pet.desexed,
          can_walk_offleash: pet.offLeash,
          can_be_petted: pet.Pet,
          can_walk_with_other_dogs: pet.friendly
        })
        console.log(result);
      } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className='registerPet'>
      <div className="registerPet-innerbox">
        <h2>Add your pet</h2>
        {
          currentPage === 1
          ?
          <PetRegisterFormFirst 
            changePage={changePage}
            submitForm={submitFirstForm}
          />
          :
          <PetRegisterFormSecond 
            changePage={changePage} 
            submitForm={submitSecondForm}
          />
        }
      </div>
    </div>
  )
}

export default ResisterPet;