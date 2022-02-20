import { get, post } from "../network/http";

const signIn = async (username, password) => {
  let res = await get(``)
}

const signUp  = async ({userInfo}) => {
  let res = await post(`/users.json`, {
    ...userInfo
  });

  return res.data;
}

const fetchUserInfo = async (user_id) => {
  let res = await get(`/users/${user_id}.json`);
  return res.data;
}

export {
  fetchUserInfo
};