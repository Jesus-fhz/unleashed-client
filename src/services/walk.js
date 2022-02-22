import { get, post } from "../network/http";

const requestWalk = async (info) => {
    console.log(info);
    let res = await post(`/walks.json/`,{...info});
    return res.data;
  }

  const requestPendingWalks = async () =>{
      let res = await get(`/walks.json`);
      const walks = {
        pets: res.data.pets,
        walks: res.data.walks
      }
      return walks;
  }

export {requestWalk, requestPendingWalks}