import { get, post } from "../network/http";
import { clearToken, getToken, setToken } from "../localStorage/token";

const signIn = async (email, password) => {
  console.log(email, password)
  const res = await post(`/user_token`, {
    auth: {
      email, password
    }
  });
  const token = await res.data.jwt;

  // set token in localStorage
  setToken(token);

  return token;
}

const checkSignIn = async () => {
  // get token from localStorage
  let token = getToken();

  if(!token) return;

  // TODO: api endpoint for this
  let res = await get(`what is this?`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return res;
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
};