import React, {useState} from 'react';
import '../style/organiseWalkModal.scss';

const OrganiseWalkModal = ({
  isOpen,
  handleModal,
  handleFind,
  selectedPet
}) => {
  const [duration, setDuration] = useState(0);
  const [msg, setMsg] = useState("");

  const changeDuration = (e) => setDuration(e.target.value);
  const changeMsg = (e) => setMsg(e.target.value);

  const submitWalk = (e) => {
    e.preventDefault();

    console.log("----------------- organise submit data here -------------")
    console.log(duration)
    console.log(selectedPet)

    console.log(msg)

    // close modal
    handleModal();
    // show loading effect
    handleFind();
  }

  return (
    // <>
    //   {
    //     !isOpen 
    //     ||
        <div className={`organiseWalkModal ${!isOpen || "active"}`}>
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
              <div>
              <label>Duration</label>
              <select onChange={(e) => changeDuration(e)}>
                <option value="15">15 mins</option>
                <option value="30">30 mins</option>
                <option value="45">45 mins</option>
                <option value="60">1 hr</option>
                <option value="90">1.5 hr</option>
                <option value="120">2 hr</option>
              </select>
              </div>
              <div>
                <label>Special Instruction</label>
                  <textarea 
                  type="text"
                  onChange={(e) => changeMsg(e)}
                />
              </div>
              <button>Find a walker nearby</button>
            </form>
          </dialog>
        </div>
    //   }
    // </>
  )
}

export default OrganiseWalkModal