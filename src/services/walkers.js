import { get, post } from "../network/http";

const getNearbyWalkers = async (lat, lng) => {
  let res = await get(`/users/find/${lat}/${lng}`);

  return res.data;
}

export {
  getNearbyWalkers
}