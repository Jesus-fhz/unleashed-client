import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/userPetList.scss'

const UserPetList = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // fetch data here : user's all pets

    // data = 
    // setPets([...data])
  }, []);

  return (
    <div className="userPetList">
      <ul>
        {/* example data */}
        <li>
          <div className="img-container">
            <img src="" alt="" />
          </div>
          <div>
            <h3>Pet name</h3>
            <p>Breed here</p>
            <p>2 Years old</p>
            <Link to="/">Change profile</Link>
          </div>
        </li>

        {/* {pets.data.map((pet) => (
          <li key={pet.id}>
            <img src={pet.image} alt={pet.name} />
            <div>
              <h3>{pet.name}</h3>
              <p>{pet.breed}</p>
              <p>{pet.BOD}</p>
            </div>
          </li>
        ))} */}

      </ul>
    </div>
  )
}

export default UserPetList;