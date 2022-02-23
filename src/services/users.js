import { get, post, patch } from "../network/http";

const fetchUserInfo = async (user_id) => {
  let res = await get(`/users/${user_id}.json`);
  return res.data;
}

const writeUserInfo = async (userInfo) => {
  let res = await patch (`/users/${userInfo.id}.json`, {...userInfo});
  return res.data
}

const postUserInfo = async (userInfo) => {
  console.log('User post successful: ', userInfo)
  let res = await post (`/users.json/`, {...userInfo});
  return res.data
}

export {
  fetchUserInfo, writeUserInfo, postUserInfo
};