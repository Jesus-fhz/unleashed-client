import React, { useState, useEffect, createContext, useContext } from 'react';
import {signIn, signUp, logout, getPayload } from '../services/auth';
import Signin from '../routes/Signin';
import { getToken } from '../localStorage/token';
import { getLocation, sendLocation } from '../services/walkers';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  // [:pending, :accepted, :ongoing, :finished]
  const [status, setStatus] = useState("pending");
  const [user, setUser] = useState(undefined);
  const [location, setLocation] = useState(false);

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
      let intervalID;

      // we need to start make a api call here
      if(status === "accepted" || status === "ongoing") {
        intervalID = setInterval(() => {
          // if you are a walker, we will send your location to backend 
          if(user.user_type === "waker") {
            // need to get their location here
            const location = {lat: 0, lng: 0};

            sendLocation(location.lat, location.lng)
            .then(data => setLocation(data));
          }

          // if you are a owner, we will get the walker's location from backend
          if(user.user_type === "owner") {
            // need to find walk? walker's id
            const walker_id = 1;
            
            getLocation(walker_id)
              .then(data => setLocation(data));
          }

        }, 3000);
      }

      // we need to stop the api calls here
      if(status === "pending" || status === "finished") {
        clearInterval(intervalID);
      }
    }, [status, user]);


    const changeStatus = (status) => {
      setStatus(status);
    }

    // if you are a walker, you need to update state in front end, 
    const updateLocation = (location) => {
      setLocation(location);
    };


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
      status,
      onSignIn, 
      onLogout, 
      onSignUp,
      changeStatus,
      updateLocation,
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