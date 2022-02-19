import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserPets } from '../services/pets';
import '../style/userPetList.scss'

const UserPetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // fetch data here : user's all pets

    // put example user id
    fetchUserPets(59)
      .then((data) => {
        setPets(data);
        setLoading(false);
      })
      .catch(() => setError(true));
  }, []);


  return (
    <div className="userPetList">
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            <div className="img-container">
              <img src={pet.image} alt={pet.name} />
            </div>
            <div>
              <h3>{pet.name}</h3>
              <p>{pet.breed}</p>
              <p>{pet.BOD}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPetList;