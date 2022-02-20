import { get, post } from "../network/http";

const fetchUserInfo = async (user_id) => {
  let res = await get(`/users/${user_id}.json`);
  return res.data;
}

export {
  fetchUserInfo
};