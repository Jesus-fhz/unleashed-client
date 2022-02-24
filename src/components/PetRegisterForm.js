import React, { useState } from 'react';
import '../style/petRegisterForm.scss';

const PetRegisterFormFirst = ({changePage, submitForm}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');

  const changeName = (e) => setName(e.target.value);
  const changeAge = (e) => setAge(e.target.value);
  const changeSize = (e) =>  setSize(e.target.value);
  const changeBreed = (e) => setBreed(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    submitForm({
      name, age, size, breed, gender
    });
    changePage(2)
  }

  return (
    <div className='petRegisterForm --first'>
      <p>Tell me about your pet.</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label>Name</label>
          <input
            required={true}
            type="text"
            onChange={(e) => changeName(e)}
          />
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
          />
        </div>
        <div>
          <label>Age</label>
          <input
            type="text"
            onChange={(e) => changeAge(e)}
          />
        </div>
        <div>
          <label>Size</label>
          <select required={true} onChange={(e) => changeSize(e)}>
            <option value="">Select size</option>
            <option value="tiny">Tiny (1kg - 4kg)</option>
            <option value="small"> Small (4kg - 9kg)</option>
            <option value="medium">Medium (9kg - 20kg)</option>
            <option value="big">Big (9kg - 20kg)</option>
          </select>
        </div>
        <div>
          <label>Breed</label>
          <input
            type="text"
            onChange={(e) => changeBreed(e)}
          />
        </div>
        <div className='gender'>
          <p>Gender</p>
          <div>
            <div>
              <label>Female</label>
              <input
                type="radio"
                name="gender"
                id="female"
                onClick={() => setGender(false)}
              />
            </div>
            <div>
              <label>Male</label>
              <input
                type="radio"
                name="gender"
                id="male"
                onClick={() => setGender(true)}
              />
            </div>
          </div>
        </div>
        <button type="submit">
          Next
        </button>
      </form>
    </div>
  )
}

const PetRegisterFormSecond= ({changePage, submitForm}) => {
  const [desexed, setDesexed] = useState(false);
  const [offLeash, setOffLeash] = useState(false);
  const [pet, setPet] = useState(false);
  const [friendly, setFriendly] = useState(false);

  const changeDesexed = () => desexed ? setDesexed(false) : setDesexed(true);
  const changeOffLeash = () => offLeash ? setOffLeash(false) : setOffLeash(true);
  const changePet = () => pet ? setPet(false) : setPet(true);
  const changeFriendly = () => friendly ? setFriendly(false) : setFriendly(true);

  const onSubmit = (e) => {
    e.preventDefault();

    submitForm({
      desexed, offLeash, pet, friendly
    });
  }

  return (
    <div className='petRegisterForm --second'>
      <p>Tell me more about your pet.</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label>Desexed?</label>
          <input type="checkbox" onClick={() => changeDesexed()} />
        </div>
        <div>
          <label>Can Dog go off the leash?</label>
          <input type="checkbox" onClick={() => changeOffLeash()} />
        </div>
        <div>
          <label>Do you allow other people to pet your dog?</label>
          <input type="checkbox" onClick={() => changePet()} />
        </div>
        <div>
          <label>Can your dog walk with other dogs?</label>
          <input type="checkbox" onClick={() => changeFriendly()} />
        </div>
        <div className="btn-container">
          <button onClick={() => changePage(1)}>
            Back
          </button>
          <button type="submit">
            Add my pet
          </button>
        </div>
      </form>
    </div>
  )
}

export { PetRegisterFormFirst, PetRegisterFormSecond };