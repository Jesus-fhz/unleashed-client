import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


import { PetRegisterFormFirst, PetRegisterFormSecond } from '../../components/PetRegisterForm';
import '../../style/registerPet.scss'
import { saveUserPet } from '../../services/pets';

const ResisterPet = () => {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [petInfo, setPetInfo] = useState({});
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const changePage = (page) => {
    setCurrentPage(page);
  }

  const submitFirstForm = (info) => {
    console.log('petInfo in state: ',petInfo, 'info passed by form: ', info)
    setPetInfo({...petInfo, ...info});
  }
  
  const submitSecondForm =  (info) => {
    setPetInfo({...petInfo, ...info});
    savePet({...petInfo,...info});

    navigate("/");
  }

  const savePet = async (data)=>{
    const infoPet = {
      user_id: authContext.user.id,
      image: data.image,
      name: data.name,
      breed: data.breed,
      age: data.age,
      is_male: data.gender,
      size: data.size,
      desexed: data.desexed,
      can_walk_offleash: data.offLeash,
      can_be_petted: data.pet,
      can_walk_with_other_dogs: data.friendly
    }

    

    saveUserPet({infoPet})
      .then((data) =>{setData(data)} )
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  return (
    <div className='registerPet'>
      <div className="registerPet-innerbox">
        <h2>Register pet</h2>
        {/* {
          loading === true && error === false
            ?
            <p>loading...</p>
            :
            loading === false && error === true
            ?
            <p>error...</p>
            :
             data.name
        }  */}

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