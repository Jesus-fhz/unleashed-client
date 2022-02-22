import { get, post } from "../network/http";

const getNearbyWalkers = async (lat, lng) => {
  let res = await get(`/users/find/${lat}/${lng}`);

  return res.data;
}

const sendLocation = async (lat, lng) => {
  let res = await post();

  return res.data;
}

const getLocation = async (walker_id) => {
  let res = await get(``);

  return res.data;
}

export {
  getNearbyWalkers,
  sendLocation,
  getLocation
}