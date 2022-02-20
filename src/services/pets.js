import { get, post } from "../network/http";


const fetchUserPets = async (user_id) => {
  let res = await get(`/users/${user_id}/pets`);

  return res.data;
}

const saveUserPet = async ({infoPet}) => {
  let res = await post('/pets.json',{...infoPet});
  console.log(res);
  return res.data;
}

export {fetchUserPets, saveUserPet};