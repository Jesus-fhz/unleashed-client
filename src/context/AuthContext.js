import React, { useState, useEffect, createContext, useContext } from 'react';
import {signIn, signUp, logout, getPayload } from '../services/auth';
import Signin from '../routes/Signin';
import { getToken } from '../localStorage/token';
import { getLocation, sendLocation } from '../services/walk';
import {getWalkInfo, changeStatusWalk} from '../services/walk.js'
export const AuthContext = createContext({});

let intervalID;


export const AuthProvider = ({children}) => {
  // [:pending, :accepted, :pickup, :ongoing, :dropoff, :finished]
  const [status, setStatus] = useState('pending');
  const [ongoingWalkID, setOngoingWalkID] = useState();
  const [user, setUser] = useState(undefined);
  const [location, setLocation] = useState(false);
  const [destination, setDestination] = useState(false);
  const [walkData, setWalkData] = useState(undefined);
 
  // TODO: we need a endpoint for this.
  // when the App is rendered, this will run.
  // it'll send our token in LocalStorage, and need to et response with the user's information. 

  // when the app is rendered, check if they have jwt in localStorage, and use it
    useEffect(() => {
      // if there is no token in the local storage
      if (getToken() !== null ){
        return getPayload(getToken())
        .then(data =>{
          setUser(data.data)
        })
      }
    },[]);

    // this will run whenever the status changes
    useEffect(() => {
      // let intervalID;

      // we need to start make a api call here
      if(status === "accepted" || status === "ongoing" || status === "pickup" || status === "dropoff"){
        // if you are a walker, we will send your location to backend 
        if(user.user_type === "walker" && location.lat !== undefined && location.lng !== undefined) {
          // need to get their location here with geo
          // console.log('location inside AuthContext useEffect:', location);
          sendLocation({
            walk_id: ongoingWalkID,
            lat: location.lat,
            lng: location.lng,
          });
        }
      }
    }, [location]);

 

    useEffect(() => {
      console.log("checking status change:",status);
      changeStatusWalk(ongoingWalkID, status)
      .then(data =>console.log("updating walk status", data))
      .catch(error => console.log(error))
    },[status])

    const changeOngoingWalk = (id) => {
      setOngoingWalkID(id);
      let intervalID;
          intervalID = setInterval(() => {
            getWalkInfo(id)
              .then(data => {
                if(data.walks.status === "accepted" || data.walks.status === "ongoing" || data.walks.status === "pickup" || data.walks.status === "dropoff"){
                   setWalkData(data);
                   setStatus(data.walks.status);
                   setLocation({
                     lat: data.walks.latitude,
                     lng: data.walks.longitude
                    })
                    console.log('status', status);
                   clearInterval(intervalID);
               }
              })
          }, 4000)
    }
    
    const changeStatus = (status) => setStatus(status);
    // const changeOngoingWalk = (id) => setOngoingWalkID(id);
    // if you are a walker, you need to update state in front end, 
    const updateLocation = (location) => setLocation(location);
    const updateDestination = (destination) => setDestination(destination); //FIXME: check if we're setting the whole walk obj in here OR is it just the lat and lng

  // It'll use "signIn" function from "service/auth" to fetch data.
  // and "signIn" function returns the fetched data which is token.
  // if data fetching succeeds, it will set user state with the token.

  // TODO: we need to get user information (name?) along with token.
  const onSignIn = (email, password) => {
      return signIn(email, password)
      .then(data => {
        setUser(data.data);
        return data;
      });
  };


  // TODO: need to know which info we need here exactly.
  const onSignUp = (userInfo) => {
    return signUp({
      name: userInfo.name,
      email: userInfo.email,
      user_type: userInfo.user_type,
      address: userInfo.address,
      password: userInfo.password,
      profile_image: userInfo.profile_image
    })
      .then(data => {
        // setUser(data);
        return data;
      })
  };

  const onLogout = () => {
    logout();
    setUser(undefined);
  };
  return (
    <AuthContext.Provider value={{
      user,
      location,
      destination,
      status,
      walkData,
      onSignIn, 
      onLogout, 
      onSignUp,
      changeStatus,
      updateLocation,
      updateDestination,
      changeOngoingWalk
      }}>
      {
        user
        ?
        children
        :
        <Signin onSignIn={onSignIn} onSignUp={onSignUp} />
      }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);