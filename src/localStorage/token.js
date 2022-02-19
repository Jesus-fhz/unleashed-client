const TOKEN = 'token';

const setToken = (token) => {
  localStorage.setItem(TOKEN, token);
}

const getToken = () => {
  return localStorage.getItem(TOKEN);
}

const clearToken = () => {
  localStorage.clear(TOKEN)
}

export {
  setToken, 
  getToken, 
  clearToken
}