import React, { useState, useEffect, useContext } from 'react';
import { Marker, GoogleMap, LoadScript } from '@react-google-maps/api';
import { AuthContext } from '../context/AuthContext';
import { getNearbyWalkers } from '../services/walkers';
import '../style/map.scss';
import {useInterval} from './UseInterval'
import { Link } from 'react-router-dom';


// TODO: how to make the map size responsively
const containerStyle = {
  width: window.innerWidth - 340,
  height: window.innerHeight
};


// The main map showing on OWNER page, populated with <Markers /> representing nearby WALKERS
function Map({isFinding}) {
  const [currentPosition, setCurrentPosition] = useState({lat: 0, lng: 0});
  const [destination, setDestination] = useState();
  const [nearbyWalkers, setNearbyWalkers] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    getCurrentLocation();
    loadWalkers();
  
    return () => clearInterval(intervalID);
  }, []);


  const fakeMovement = (moverLocation, setMoverLocation, stationaryLocation, setStationaryLocation) => {
    const incrementDistance = 0.00002;
    let x, y;
    
    // if current position within range of destination then don't perform fake move 
    if (moverLocation.lng < stationaryLocation.lng + incrementDistance * 10) { 
      x = incrementDistance;
    } else if (moverLocation.lng > stationaryLocation.lng - incrementDistance * 10){
      x = 0 - incrementDistance;
    }

    if (moverLocation.lat < stationaryLocation.lat + incrementDistance * 10) {
      y = incrementDistance;
    } else if (moverLocation.lat > stationaryLocation.lat - incrementDistance * 10){
      y = 0 - incrementDistance;
    }

    if( moverLocation.lat > stationaryLocation.lat + incrementDistance * 10 && moverLocation.lng < stationaryLocation.lng - incrementDistance * 10){
      //setState for the walk done. 
      console.log('walk done');

      auth.changeState("finished");
    }
    
    const newLng = moverLocation.lng + x;
    const newLat = moverLocation.lat + y;
    
    setMoverLocation({lng: newLng, lat: newLat });
  }

  // // since we are using AuthContext for location, it will be eventually like this
  // useEffect(() => {
  //   if(auth.status === "ongoing" || auth.status === "accepted") {
  //     // TODO: move map function here
  //     // from auth.location to destination
  //   }
  // }, [auth]);


  let intervalID;

  if(auth.status === "accepted" || auth.status === "ongoing"){
    console.log(auth.location)

    intervalID = setInterval(() => {
      if (auth.user.user_type === 'owner'){
        fakeMovement(destination, setDestination, currentPosition, setCurrentPosition );
        console.log('destination:',destination);
      } else {
        fakeMovement(currentPosition, setCurrentPosition, destination, setDestination);
      }
    }, 10000);
  }
  
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
      
      {
        currentPosition?.lat !== 0 && currentPosition?.lng !== 0
        ?
        <LoadScript googleMapsApiKey="AIzaSyAm7vYw4jkC7m9hbEKpMfFxjwLAOZgxwko">
          <GoogleMap 
            mapContainerStyle={containerStyle} 
            center={currentPosition} 
            zoom={15}
          > 
            <Marker 
              position={currentPosition}
              animation = {2}
            />
            <Marker 
              position={destination}
          />
            
            { // get all the markers for close by walkers
              nearbyWalkers.map((el) => (
                <Marker
                  key={el.id}

                  icon="https://i.imgur.com/kEXCUkc.png?1"
                  // onLoad={onLoad}
                  position={  {lat: el.latitude, lng: el.longitude}}
                />
              ))
            }
            
          </GoogleMap>
        </LoadScript>
        :
        <p>Finding your location...</p>
      }
    </div>
  )
}

export default Map;