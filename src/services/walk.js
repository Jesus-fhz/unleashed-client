import { get, post, patch } from "../network/http";

const   requestWalk = async (info) => {
    let res = await post(`/walks.json/`,{...info});
    return res.data;
  }

const requestPendingWalks = async (lat, lng) =>{
    let res = await get(`/walks/pending/${lat}/${lng}`);
  
    const walks = {
      pets: res.data.pets,
      walks: res.data.walks
    }
    return walks;
}

const acceptWalk = async (info) => {
  let res = await patch(`/walks/${info.walk_id}/accepts`, {
    // :pet_id, :user_id, :status, :cost, :duration, :latitude, :longitude, :special_instruction
    pet_id: info.pet_id,
    user_id: info.user_id,
    status: info.status,
    cost: info.cost,
    duration: info.duration,
    latitude: info.lat,
    longitude: info.lng,
    special_instruction: "fuckkkkkkkkk"
  });

  return res.data;
}

  

export {
  requestWalk, 
  requestPendingWalks,
  acceptWalk
}