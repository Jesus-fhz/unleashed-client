import React from 'react';
import '../style/organiseWalkModal.scss';

const OrganiseWalkModal = ({
  isOpen,
  handleModal,
  selectedPet
}) => {

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
              {/* <h2>Organise a walk</h2> */}
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
            <form>
              {/* <label>How long do you ?</label> */}
              <select>
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