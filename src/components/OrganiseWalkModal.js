import React, {useState, useContext} from 'react';
import '../style/organiseWalkModal.scss';
import { requestWalk } from '../services/walk';
import { AuthContext } from '../context/AuthContext';

const OrganiseWalkModal = ({
  isOpen,
  handleModal,
  handleFind,
  selectedPet,
  status,
  handleStatus
}) => {
  const [duration, setDuration] = useState(0);
  const auth = useContext(AuthContext);
  const changeDuration = (e) => setDuration(e.target.value);

  console.log(auth);
  const submitWalk = (e) => {
    e.preventDefault();
    const walk = {
        pet_id : selectedPet[0].id,
        user_id : '',
        status : status,
        cost: 212,
        duration: duration,
        geocode_lng: auth.user.latitude ,
        geocode_lat: auth.user.longitude,
        special_instruction : 'He is thic boy',
    } 
    requestWalk(walk) 
      .then(data => console.log('response from walk', data))
      .catch(error => console.log(error));
    handleModal();
    handleFind();
  }

  return (
    <>
      {
        !isOpen 
        ||
        <div className="organiseWalkModal">
          <div 
            className="overlay"
            onClick={() => handleModal()}
          />
          <dialog>
            <button
              className="closeBtn"
              onClick={() => handleModal()}
            >
              &times;
            </button>
            <div className="petInfo">
              <ul>
                {
                  selectedPet.map((pet) => (
                    <li key={pet.id}>
                      <div className="img-container">
                        <img src={pet.image} alt={pet.name} />
                      </div>
                      <div className="text-container">
                        <h3>{pet.name}</h3>
                        <p>{pet.breed}, {pet.age} Years old</p>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
            <form onSubmit={(e) => submitWalk(e)}>
              {/* <label>How long do you ?</label> */}
              <select onChange={(e) => changeDuration(e)}>
                <option value="15">15 mins</option>
                <option value="30">30 mins</option>
                <option value="45">45 mins</option>
                <option value="60">1 hr</option>
                <option value="90">1 hr 30 mins</option>
                <option value="120">2 hr</option>
              </select>
              <button>Find a walker nearby</button>
            </form>
          </dialog>
        </div>
      }
    </>
  )
}

export default OrganiseWalkModal