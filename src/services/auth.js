import { get, post, setHeaders } from "../network/http";
import { clearToken, getToken, setToken } from "../localStorage/token";
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

// helper function that fetches the JWT token through the API connection to our Rails server
const getPayload = async (token) => {
  const getPayload = await get(`/users/current`, {
    headers: {
      'Authorization': "Bearer " + token
    }
  })
  setHeaders(token);
  return getPayload
};

const signIn = async (email, password) => {
  const res = await post(`/user_token`, {
    auth: {
      email, password
    }
  });
  const token = await res.data.jwt;
  const payload = getPayload(token);
  // set token in localStorage
  setToken(token);
  return payload;
}

const checkSignIn = async () => {
  // get token from localStorage
  let token = getToken();
  if(!token) return false;
  return token
  // TODO: api endpoint for this
  // let res = await get(`what is this?`, {
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   }
  // })

  // return res;
}

const signUp  = async ({userInfo}) => {
  let res = await post(`/users.json`, {
    ...userInfo
  });

  return res.data;
}

const logout = async () => {
  // clear the localStorage
  clearToken();
}

export {
  signIn,
  checkSignIn,
  signUp,
  logout,
  getPayload
};