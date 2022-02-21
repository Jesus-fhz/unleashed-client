import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchUserPets } from '../services/pets';
import edit_icon from '../assets/images/edit_icon.png';
import dog_icon from '../assets/images/dog_icon.svg';
import user_icon from '../assets/images/user_icon.svg';
import home_icon from '../assets/images/home_icon.svg';
import '../style/userPetList.scss'
import Nav from './Nav';


const UserPetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedPet, setSelectedPet] = useState([]);
  const authContext = useContext(AuthContext);

  // fetch user's all pets when the component is rendered
  useEffect(() => {
    // put example user id
    fetchUserPets(authContext.user.id) 
      .then((data) => setPets(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const selectPet = (id) => {
    const isExist = selectedPet.some((item) => item === id);

    if(isExist) {
      setSelectedPet(selectedPet.filter(item => item !== id));
    } else {
      setSelectedPet([...selectedPet, id]);
    }
  }

  const organiseWalk = () => {
    console.log(selectedPet)

  }


  return (
    <>
      {
        loading === true && error === false
        ?
        <p>loading...</p>
        :
        loading === false && error === true
        ?
        <p>error...</p>
        :
        <div className="userPetList">
          <h1>
            <Link to="/">Unleashed</Link>
          </h1>
          <div className="scroll-container">
            <ul>
              {pets.map((pet) => (
                <li key={pet.id}>
                  <div className="item-innerbox">
                    <Link to="/" className="editBtn">
                      <img src={edit_icon} alt="edit" />
                    </Link>
                    <div className="img-container">
                      <img src={pet.image} alt={pet.name} />
                    </div>
                    <div className="text-container">
                      <h3>{pet.name}</h3>
                      <p className="breed">{pet.breed}, {pet.age} Years old</p>
                    </div>
                  </div>
                  <button 
                    className="selectBtn"
                    onClick={() => selectPet(pet.id)}
                  >
                    {
                    selectedPet.some((id) => id === pet.id) 
                    ?
                    "Cancel"
                    :
                    "Select"
}
                  </button>
                </li>
              ))}
            </ul>
            {/* <Link to="/owner/register" className="addBtn">
              +
            </Link> */}
            {
            selectedPet.length > 0 
            ? 
            <button onClick={() => organiseWalk()}>Organise walk</button> 
            : ""
            }
          </div>
          <Nav />
        </div>
      }
    </>
  )
}

export default UserPetList;