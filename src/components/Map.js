import React, { useState, useEffect, useContext } from 'react';
import { Marker, GoogleMap, LoadScript } from '@react-google-maps/api';
import { AuthContext } from '../context/AuthContext';
import { getNearbyWalkers } from '../services/walkers';
import '../style/map.scss';
import {useInterval} from './UseInterval'
import { Link } from 'react-router-dom';
import { getLocation } from '../services/walk';

let intervalID1;
let intervalID2;

// TODO: how to make the map size responsively
const containerStyle = {
  width: window.innerWidth - 340,
  height: window.innerHeight
};

//TODO: ask laurence about the GetCurrentPosition function, I think is my computer location but I need to double check with him
// The main map showing on OWNER page, populated with <Markers /> representing nearby WALKERS
function Map({isFinding, showRadar}) {
  const [currentPosition, setCurrentPosition] = useState(undefined); 
  const [nearbyWalkers, setNearbyWalkers] = useState([]);
  const [angle, setAngle] = useState(0);
  // OWNER SPECIFIC DB
  const [walkerPosition, setWalkerPosition] = useState(undefined)
  
  const auth = useContext(AuthContext);
  // On component mount
  useEffect(() => {
      if(auth.user.user_type === "walker") {
        getCurrentLocation();
      } else {
        //TODO: RIGHT NOW CHANGE THIS TO THE OWNER CURRENT LOCATION
        setCurrentPosition({lat: auth.user.latitude, lng: auth.user.longitude})
      }
  }, []);         


  // On component update with polling. 
  //OWNER USE EFFECT
  useEffect(() => {
    if(auth.user.user_type === "owner") {
      console.log('auth status', auth.status);
      
      if(auth.status === "accepted" || auth.status === "ongoing" ){
        clearInterval(intervalID1);
        intervalID1 = setInterval(() => {
          // add polling in here
          getLocation(auth.walkData.walks.id)
          .then(data => {
            setWalkerPosition({
              lat: data.latitude,
              lng: data.longitude, 
            });
          }).catch( err => {
            console.log('getLocation() ERROR:', err);
          });
          
          // setWalkerPosition(auth.location)
        }, 1000);
      }

      if(auth.status === "pickup") {
        console.log("owner's status is pickup")
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.status])
  
  //WALKER USE EFFECT
  useEffect(() => {
    if(auth.status === "accepted" || auth.status === "ongoing") {
      // if you are a walker, we will update your location 
      if(auth.user.user_type === "walker" && auth.destination !== false) {
        clearInterval(intervalID2);
        intervalID2 = setInterval(() => {
          if(auth.status === "accepted"){
            fakeMovement(currentPosition, setCurrentPosition, auth.destination); // TODO: make the currentPosition and ad the set the auth equivalent methods. 
            auth.updateLocation(currentPosition); //TODO: REMOVE JIA"S 
            // FIXME: get this location actually changing location
          } else if ( auth.status === "ongoing" ) {
            fakeWalk(currentPosition, setCurrentPosition, auth.destination);
            auth.updateLocation(currentPosition); //TODO: REMOVE JIA"S 
          }
        }, 25);
      }

      // if you are a owner, we will give you the walker's location
    }

    // return () => clearInterval(intervalID);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, currentPosition]);

  useEffect(()=> {
    if(auth.status === "pending" && currentPosition){
      loadWalkers();
    }
  }, [currentPosition])

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

  //TODO: figure out why this is breaking when
  const loadWalkers = async () => {
    try{
      let res = await getNearbyWalkers(currentPosition.lat, currentPosition.lng)
      setNearbyWalkers(res)
    } catch(err) {
      console.log("loadWalker ERROR:", err)
    }
      
    // }
  }

  //////////////////////////////
  // WALKER SPECIFIC FUNCTIONS//
  ////////////////////////////// 

  const fakeMovement = (moverLocation, setMoverLocation, stationaryLocation) => {
    const incrementDistance = 0.00008;
    let x = 0;
    let y = 0;

    const xOver = moverLocation.lng > stationaryLocation.lng + incrementDistance * 2;
    
    const xUnder = moverLocation.lng < stationaryLocation.lng - incrementDistance * 2;
    const xCorrect = !(xOver || xUnder);

    const yOver = moverLocation.lat > stationaryLocation.lat + incrementDistance * 2;
    const yUnder = moverLocation.lat < stationaryLocation.lat - incrementDistance * 2;
    const yCorrect = !(yOver || yUnder);

    if( xCorrect && yCorrect ){
      // console.log('both x and y correct')
      //setState for the walk done. 
      setMoverLocation(stationaryLocation);
      auth.changeStatus("pickup");
      console.log(auth.status)
      // fakeWalk(moverLocation, setMoverLocation, stationaryLocation)
      return;
    }
    else {
      // if current position within range of destination then don't perform fake move

      if (xUnder) { 
        x = incrementDistance;
      } else if (xOver){
        x = 0 - incrementDistance;
      }

      if (yUnder) {
        y = incrementDistance;
      } else if (yOver){
        y = 0 - incrementDistance;
      }
    }
    
    const newLng = moverLocation.lng + x;
    const newLat = moverLocation.lat + y;
    
    setMoverLocation({lng: newLng, lat: newLat });
  }

  const fakeWalk = (moverLocation, setMoverLocation, stationaryLocation) => {

    console.log('hellooooo fakewalk started')

    let x = 0.00004 * Math.cos(angle);
    let y = 0.00004 * Math.sin(angle);
    
    // how to make the trigger of coming back to home
    const newLng = moverLocation.lng + x;
    const newLat = moverLocation.lat + y;

    setAngle(angle + 6.282 / 500);

    if (angle > 6.282){
      setMoverLocation(stationaryLocation); // TODO: GET THE SNAPPING AT THE END WORKING. 
      auth.changeStatus("dropoff");
      return;
    }
 
    setMoverLocation({lng: newLng, lat: newLat });
  } 

  
  return (
    <div className="map">
      {/* TODO: need to put loading effect inside of the map, but can't change their className to style it */}

      {
        showRadar
        ?
        <div className={`loading-effect ${isFinding ? "active" : ""}`} />
        :
        ""
      }
      
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
              icon={auth.user.user_type === "owner" ? "https://i.imgur.com/kEXCUkc.png?1" : "https://i.imgur.com/cVTBuZe.png?1"}
            />
            
            {
              //We only show the walker tracking if user === owner and the location of the ower is set
              auth.user.user_type === "owner" && auth.location
              ?
                <Marker 
                  position={walkerPosition
                    // this is owner's house location
                  }
                  icon={"https://i.imgur.com/cVTBuZe.png?1"}
                  animation = {2}
                />
              :
                ''
                
            }

            {
              auth.status !== 'pending' && auth.status !== null && (auth.destination) 
              ?            
                <Marker 
                  position={auth.destination}
                  icon="https://i.imgur.com/kEXCUkc.png?1"

                  animation = {2}
                />
              : 
                nearbyWalkers.map((el) => (
                  <Marker
                    key={el.id}
                    icon="https://i.imgur.com/cVTBuZe.png?1"
                    // onLoad={onLoad}
                    position={{lat: el.latitude, lng: el.longitude}}
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