import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchUserPets } from '../services/pets';
import '../style/userPetList.scss'
import Nav from './Nav';


const UserPetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const authContext = useContext(AuthContext);

  // fetch user's all pets when the component is rendered
  useEffect(() => {
    // put example user id
    fetchUserPets(authContext.user.id) 
      .then((data) => setPets(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);


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
          <Nav />
          <div className="scroll-container">
            <ul>
              {pets.map((pet) => (
                <li key={pet.id}>
                  <div className="item-innerbox">
                    <div className="img-container">
                      <img src={pet.image} alt={pet.name} />
                    </div>
                    <div className="text-container">
                      <h3>{pet.name}</h3>
                      <p className="breed">{pet.breed}, {pet.age} Years old</p>
                    </div>
                  </div>
                  <div className="btn-container">
                    <Link to="/">
                      Edit
                    </Link>
                    <button>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/owner/register" className="addBtn">
              +
            </Link>
          </div>
        </div>
      }
    </>
  )
}

export default UserPetList;