import { get, post, patch } from "../network/http";

const   requestWalk = async (info) => {
    let res = await post(`/walks.json/`,{...info});
    return res.data;
  }

const requestPendingWalks = async (lat, lng) =>{
    let res = await get(`/walks/pending/${lat}/${lng}`);
    const walks = {
      walks: res.data
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
    special_instruction: info.special_instruction
  });

  return res.data;
}


const changeStatusWalk = async(id, statusWalk) => {
  const status =["pending", "accepted", "pickup", "ongoing", "dropoff", "finished"]
  
  let res = await patch(`/walks/${id}/accepts`, {
    // :pet_id, :user_id, :status, :cost, :duration, :latitude, :longitude, :special_instruction
    status: status.indexOf(statusWalk),
  });

  return res.data;
}



const getOwnerAddress = async(walk_id) => {
  let res = await get(`/walks/${walk_id}/owner/loc`)

  return res.data
}

const sendLocation = async (info) => {
  let res = await patch(`/walks/${info.walk_id}.json`, {
    latitude: info.lat,
    longitude: info.lng
  });
  
  return res.data;
}

const getLocation = async (walk_id) => {
  let res = await get(`/walks/${walk_id}`);
  // console.log('response inside getLocation:', res);
  return res.data;
}

const getWalkInfo = async (walkID) => {
  let res = await get(`/walks/accepted/${walkID}`);
  return res.data;
}

  

export {
  requestWalk, 
  requestPendingWalks,
  acceptWalk,
  sendLocation,
  getLocation,
  getOwnerAddress,
  getWalkInfo,
  changeStatusWalk
}