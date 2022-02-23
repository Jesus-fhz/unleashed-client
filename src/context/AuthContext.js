import React, { useState, useEffect, createContext, useContext } from 'react';
import {signIn, signUp, logout, getPayload } from '../services/auth';
import Signin from '../routes/Signin';
import { getToken } from '../localStorage/token';
import { getLocation, sendLocation } from '../services/walk';
import {getWalkInfo} from '../services/walk.js'
export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  // [:pending, :accepted, :ongoing, :finished]
  const [status, setStatus] = useState("pending");
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
      if(status === "accepted" || status === "ongoing") {
        // if you are a walker, we will send your location to backend 
        if(user.user_type === "walker" && location.lat !== undefined && location.lng !== undefined) {
          // need to get their location here with geo
          sendLocation({
            walk_id: ongoingWalkID,
            lat: location.lat,
            lng: location.lng,
          });
        }

        // if you are a owner, we will get the walker's location from backend
        if(user.user_type === "owner") {          
          getLocation(ongoingWalkID)
            .then(data => setLocation({
              lat: data.latitude,
              lng: data.longitude, 

            }));
        }
      }
    }, [status, user, location]);



    const changeOngoingWalk = (id) => {
      setOngoingWalkID(id);

      let intervalID;
        if(user.user_type === "owner") {
          intervalID = setInterval(() => {
            getWalkInfo(id)
              .then(data => {
               if(data.walks.status === "accepted" || data.walks.status === "ongoing"){
                  console.log('accepted yaaaay,', data.walks)
                   setWalkData(data);
                   setStatus(data.walks.status);
                   clearInterval(intervalID);
               }
              })
          }, 4000)
        }
    }
    
    const changeStatus = (status) => setStatus(status);
    // const changeOngoingWalk = (id) => setOngoingWalkID(id);
    // if you are a walker, you need to update state in front end, 
    const updateLocation = (location) => setLocation(location);
    const updateDestination = (destination) => setDestination(destination);

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
      name: userInfo.username,
      email: userInfo.email,
      user_type: userInfo.isWalker ? "walker" : "owner",
      password: userInfo.password
    })
      .then(data => {
        setUser(data);
        return data;
      })
  };

  const onLogout = () => {
    logout()
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