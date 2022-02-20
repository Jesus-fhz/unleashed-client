import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserPets } from '../services/pets';
import '../style/userPetList.scss'
import { AuthContext } from '../context/AuthContext';

const UserPetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const authContext = useContext(AuthContext);

  // fetch user's all pets when the component is rendered
  useEffect(() => {
    // put example user id
    fetchUserPets(18)
      .then((data) => {
        console.log(data)
        setPets(data)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);


  return (
    <>
      {
        // loading === true && error === false
        // ?
        // <p>loading...</p>
        // :
        // loading === false && error === true
        // ?
        // <p>error...</p>
        // :
        <div className="userPetList">
          <ul>
            {pets.map((pet) => (
              <li key={pet.id}>
                <div className="item-innerbox">
                  <div className="img-container">
                    <img src={pet.image} alt={pet.name} />
                  </div>
                  <div>
                    <h3>{pet.name}</h3>
                    <p>{pet.breed}</p>
                    <p>{pet.age}</p>
                  </div>
                </div>
                <div className="item-btnBox">
                  <Link to="/">Edit info</Link>
                  <Link to="/">Delete</Link>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/owner/register">
            Add a new pet
          </Link>
        </div>
      }
    </>
  )
}

export default UserPetList;