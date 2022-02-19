import axios from "axios";

const BASE_URL = 'http://localhost:3000'

const get = async (url, params) => {
  let res;

  // try to fetch data
  try {
    res = await axios.get(`${BASE_URL}${url}`, {
      ...params
    });
  }catch(err) {
    console.log(err);
  }

  // if there is a connection error, throw a error with err message
  if (res.status > 299 || res.status < 200) {
    const message = res && res.message ? res.message : 'Something went wrong!';
    throw new Error(message);
  }

  // if not, return the response
  return res;
}

const push = async (url, params) => {
  let res;

  try {
    res = await axios.push(`${BASE_URL}${url}`, {
      ...params
    });
  }catch(err) {
    console.log(err);
  }

  if (res.status > 299 || res.status < 200) {
    const message = res && res.message ? res.message : 'Something went wrong!';
    throw new Error(message);
  }

  return res;
}

export {get, push};