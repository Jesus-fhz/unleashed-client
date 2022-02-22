import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchUserPets } from '../services/pets';
import Nav from './Nav';
import OrganiseWalkModal from './OrganiseWalkModal';
import edit_icon from '../assets/images/edit_icon.png';
import dog_image from '../assets/images/login_dog2.png'
import '../style/userPetList.scss'


const UserPetList = ({
  handleFind,
  isFinding,
  status,
  handleStatus
}) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedPet, setSelectedPet] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authContext = useContext(AuthContext);

  // fetch user's all pets when the component is rendered
  useEffect(() => {
    // put example user id
    fetchUserPets(authContext.user.id) 
      .then((data) => setPets(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const selectPet = (pet) => {
    const isExist = selectedPet.some((item) => item.id === pet.id);

    if(isExist) {
      setSelectedPet(selectedPet.filter(item => item.id !== pet.id));
    } else {
      setSelectedPet([...selectedPet, pet]);
    }
  }

  const handleModal = () => {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  }

  const organiseWalk = () => {
    handleModal();
  }

  const cancelWalk = () => {
    console.log("cancel the walk")
    handleFind();
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
        <>
          <OrganiseWalkModal
            isOpen={isModalOpen}
            handleModal={handleModal}
            handleFind={handleFind}
            selectedPet={selectedPet} 
            status = {status}
            handleStatus={handleStatus}
          />
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
                      onClick={() => selectPet(pet)}
                    >
                      {
                      selectedPet.some((item) => item.id === pet.id) 
                      ?
                      "Cancel"
                      :
                      "Select"
  }
                    </button>
                  </li>
                ))}
              </ul>
              {
              selectedPet.length > 0 
              ? 
              <button 
                className="organiseBtn"
                onClick={() => organiseWalk()}
              >
                {`Organise walk for ${selectedPet.length} pets`}
              </button> 
              : ""
              }
            </div>
            <Nav />

            {!isFinding || 
              <div className="userPetList-overlay">
                <div>
                  <img src={dog_image} alt="dog" />
                  <p>Looking for a walker...</p>
                </div>
                <button
                  className="cancelBtn"
                  onClick={() => cancelWalk()}
                >
                  Cancel
                </button>
              </div> 
            }
          </div>
        </>
      }
    </>
  )
}

export default UserPetList;