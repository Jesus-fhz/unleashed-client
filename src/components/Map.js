import React, { useState, useEffect } from 'react';
import { Marker, GoogleMap, LoadScript } from '@react-google-maps/api';
// import { get, post } from "../network/http";
import '../style/map.scss';
import { getNearbyWalkers } from '../services/walkers';

const containerStyle = {
  width: '400px',
  height: '400px'
};


function Map() {
  //TODO: consider removing this.
  const [currentPosition, setCurrentPosition] = useState({lat: -33.8724235, lng: 151.2591179}); 
  const [nearbyWalkers, setNearbyWalkers] = useState([]);
  
    useEffect(() => {
      // Update the document title using the browser API
      // getCurrentLocation();
      getCurrentLocation();
      loadWalkers();
    }, []);
    
  // async function loadWalkers() {
  //   try{
  //     let res = await get(`/users/find/${currentPosition.lat}/${currentPosition.lng}`);
  //     setNearbyWalkers(res.data); 
  //     getCurrentLocation()
  //     console.log('The near by walkers are:', res.data);
  //   }catch (err){
  //     console.log('Nearby walkers AJAX ERROR:', err);
  //   }
  // }

  const loadWalkers = async () => {
    getNearbyWalkers(currentPosition.lat, currentPosition.lng)
      .then((data) => setNearbyWalkers(data))
      .catch(() => console.log("loadWalker ERROR"));
  }

  // function getCurrentLocation() {
  //   let lat, lng;
  //   let promise =  new Promise(function(resolve, reject) {
  //     navigator.geolocation.getCurrentPosition( function(position){
  //       lat = position.coords.latitude
  //       lng = position.coords.longitude
  //       resolve({lat, lng})
  //     })
  //   })
    
  //   promise.then(function(value){
  //     // console.log('promise resolved coords', value.lat, value.lng);
  //     setCurrentPosition({lat: value.lat, lng: value.lng});
  //     // console.log('current location:', {lat: value.lat, lng: value.lng});
  //   })
  // }

  const getCurrentLocation = () => {
    const success = (position) => {
      setCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    }

    const error = (err) => {
      console.log("geolocation error: ", err);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  return (
    <div className="map">
      <div 
        className={`loading-effect`} 
        style={{ left: currentPosition.lng, top: currentPosition.lat}} 
      />
      <LoadScript googleMapsApiKey="AIzaSyAm7vYw4jkC7m9hbEKpMfFxjwLAOZgxwko">
        <GoogleMap 
          mapContainerStyle={containerStyle} 
          center={currentPosition} 
          zoom={12}
        > 
          <Marker position={currentPosition}/>
          
          { // get all the markers for close by walkers
            nearbyWalkers.map( (el, i) => <Marker
              key={i}
              icon="https://i.imgur.com/kEXCUkc.png?1"
              // onLoad={onLoad}
              position={{lat: el.latitude, lng: el.longitude}}
              />
            )
          }
          
        </GoogleMap>
      </LoadScript>
    </div>
  )
}


// THIS IS THE IFRAME SHOWING DIRECTIONS
// const Map = () => { //TODO: Plug in the actual to and from directions for the walker when they accept a job. NOTE: this just for showing the route to and from. 
//   return (
//     <div className="map">
//       <iframe
//           width="450"
//           height="250"
//           frameBorder="0"
//           style={{border:0}}
//           loading="lazy"
//           src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyAm7vYw4jkC7m9hbEKpMfFxjwLAOZgxwko&origin=-33.862477,150.951833&destination=-33.8724235,151.2591179&avoid=tolls|highways"
//           allowFullScreen>
//       </iframe>
//     </div>
//   )
// }

export default Map;