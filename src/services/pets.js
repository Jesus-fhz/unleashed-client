import { get } from "../network/http";


const fetchUserPets = async (user_id) => {
  let res = await get(`/users/${user_id}/pets`);

  return res.data;
}

export {fetchUserPets};