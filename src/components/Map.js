import React, { useEffect, useState } from 'react';

<<<<<<< HEAD
const Map = () => {
  const [data, setData] = useState();
  
  useEffect(() => {
    // data fetching here
  },[]);

=======
const Map = () => { //TODO: Plug in the actual to and from directions for the walker when they accept a job.
>>>>>>> e281411f015a1d0c9caf788ef48e666047c78b7c
  return (
    <div className="map">
      <iframe
          width="450"
          height="250"
          frameBorder="0"
          style={{border:0}}
          loading="lazy"
          src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyAm7vYw4jkC7m9hbEKpMfFxjwLAOZgxwko&origin=-33.862477,150.951833&destination=-33.8724235,151.2591179&avoid=tolls|highways"
          allowFullScreen>
      </iframe>
    </div>
  )
}

export default Map;