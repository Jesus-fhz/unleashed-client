import React, { useState, useEffect } from 'react';
import { Marker, GoogleMap, LoadScript } from '@react-google-maps/api';
import { getNearbyWalkers } from '../services/walkers';
import '../style/map.scss';

// TODO: how to make the map size responsively
const containerStyle = {
  width: window.innerWidth - 340,
  height: window.innerHeight
};


function Map({isFinding}) {
  //TODO: consider removing this.
  const [currentPosition, setCurrentPosition] = useState({lat: -33.8724235, lng: 151.2591179}); 
  const [nearbyWalkers, setNearbyWalkers] = useState([]);
  
    useEffect(() => {
      getCurrentLocation();
      loadWalkers();
    }, []);

  const loadWalkers = async () => {
    getNearbyWalkers(currentPosition.lat, currentPosition.lng)
      .then((data) => setNearbyWalkers(data))
      .catch(() => console.log("loadWalker ERROR"));
  }

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
      {/* TODO: need to put loading effect inside of the map, but can't change their className to style it */}
      <div 
        className={`loading-effect ${isFinding ? "active" : ""}`} 
      />
      
      <LoadScript googleMapsApiKey="AIzaSyAm7vYw4jkC7m9hbEKpMfFxjwLAOZgxwko">
        <GoogleMap 
          mapContainerStyle={containerStyle} 
          center={currentPosition} 
          zoom={14}
        > 
          <Marker 
            position={currentPosition}
            animation = {2}
          />

          
          { // get all the markers for close by walkers
            nearbyWalkers.map((el) => (
              <Marker
                key={el.id}

                icon="https://i.imgur.com/kEXCUkc.png?1"
                // onLoad={onLoad}
                position={{lat: el.latitude, lng: el.longitude}}
              />
            ))
          }
          
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default Map;