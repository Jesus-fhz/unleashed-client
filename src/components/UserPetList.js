import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserPets } from '../services/pets';
import profile_icon from '../assets/images/profile_icon.png';
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
          <div className="main-options">
            <Link to="/owner/profile">
              <img src={profile_icon} alt="my page"/>
              <p>My page</p>
            </Link>
            <div>
              <img src={profile_icon} alt="my page"/>
              <p>???</p>
            </div>
            <div>
              <img src={profile_icon} alt="my page"/>
              <p>???</p>
            </div>
            <div>
              <img src={profile_icon} alt="my page"/>
              <p>???</p>
            </div>
          </div>
          <div className="scroll-container">
            <ul>
              {pets.map((pet) => (
                <li key={pet.id}>
                  <div className="item-innerbox">
                    <Link to="/" className="editBtn">Edit</Link>
                    <div className="img-container">
                      <img src={pet.image} alt={pet.name} />
                    </div>
                    <div className="text-container">
                      <h3>{pet.name}</h3>
                      <p className="breed">{pet.breed}, {pet.age} Years old</p>
                    </div>
                  </div>
                  <button className="findBtn">
                    Find a walker
                  </button>
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