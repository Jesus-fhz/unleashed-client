import React, { useState, useEffect, createContext, useContext } from 'react';
import {signIn, signUp, logout, getPayload } from '../services/auth';
import Signin from '../routes/Signin';
import { getToken } from '../localStorage/token';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  // TODO: this user here, should be a object with info
  // {
  //   token: "",
  //   id: "",
  //   name: ""
  // }
  const [user, setUser] = useState(undefined);

  // TODO: we need a endpoint for this.
  // when the App is rendered, this will run.
  // it'll send our token in LocalStorage, and need to et response with the user's information. 

  // when the app is rendered, check if they have jwt in localStorage, and use it
    useEffect(() => {
      if (getToken() !== null ){
        return getPayload(getToken())
        .then(data =>{
          setUser(data.data)
        })
      }
    },[])


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
    logout();
    setUser(undefined);
  };

  console.log('user states', user);

  return (
    <AuthContext.Provider value={{user, onSignIn, onLogout, onSignUp}}>
      {
        user
        ?
        children
        :
        // children
        <Signin onSignIn={onSignIn} onSignUp={onSignUp} />
      }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);