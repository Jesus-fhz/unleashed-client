import React, { useState } from 'react';
import { PetRegisterFormFirst, PetRegisterFormSecond } from '../../components/PetRegisterForm';
import '../../style/registerPet.scss'

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

    // and axios post here
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