import { get } from "../network/http";

const getNearbyWalkers = async (lat, lng) => {
  let res = await get(`/users/find/${lat}/${lng}`);

  return res.data;
}

export {
  getNearbyWalkers
}