// This line is just setting a default of TOKEN. We capitalise this as we can trust this value is truly constant, and it's value will not update.
const TOKEN = 'token';

// this is a function imported in to auth.js. After the user signs in, we axios request '/user_token' which responds with a JWT (JSON web token) which holds an encoded version of our header, payload and cryptographic signature. This is creating a 'key' called token (set above) and the value is the JWT
const setToken = (token) => {
  localStorage.setItem(TOKEN, token);
}

// enables us to fetch the token from local storage to use in authorisations
const getToken = () => {
  return localStorage.getItem(TOKEN);
}

// enables us to clear the token value held in local storage at logout
const clearToken = () => {
  localStorage.clear(TOKEN)
}

export {
  setToken, 
  getToken, 
  clearToken
}