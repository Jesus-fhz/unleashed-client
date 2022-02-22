import { get, post } from "../network/http";

const fetchUserInfo = async (user_id) => {
  let res = await get(`/users/${user_id}.json`);
  return res.data;
}

const writeUserInfo = async (userInfo) => {
  let res = await post (`/users/`, {...userInfo});
  console.log(res);
  return res.data
}

export {
  fetchUserInfo, writeUserInfo
};