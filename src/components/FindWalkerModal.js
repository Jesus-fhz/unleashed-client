import React, { useEffect, useState } from 'react';
import dog_image from '../assets/images/login_dog2.png'
import '../style/findWalkerModal.scss';

let num = 0;

const FindWalkerModal = ({
  handleFind,
  isFinding
}) => {
  const [text, setText] = useState("");

  const generateText = () => {
    const text = [
      "Running around to find a walker for you...",
      "Found few walkers...",
      "Checking if they are true dog lovers..."
    ];

    num = num % text.length;
    setText(text[num]);

    num++;
  }

  useEffect(() => {
    const setIntervalID = setInterval(() => generateText(), 3000);

    console.log("hello")

    return () => clearInterval(setIntervalID);
  },[])

  return (
    <div className={`findWalkerModal ${isFinding ? "active" : ""}`}>
      <dialog>
        <h2>We are looking for a walker nearby. </h2>
        <img src={dog_image} alt="dog" />
        <p>{text}</p>
        <button onClick={() => handleFind()}>
          Cancel the walk
        </button>
      </dialog>
    </div>
  )
}

export default FindWalkerModal; 