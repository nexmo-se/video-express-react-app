import axios from 'axios';

let API_URL = `${process.env.REACT_APP_API_URL_DEVELOPMENT}`;
console.log(process.env, API_URL);
if (process.env.NODE_ENV === 'production') {
  API_URL = `${process.env.REACT_APP_API_URL_PRODUCTION}`;
}

export const getCredentials = async (roomName) => {
  return axios.get(`${API_URL}/session/${roomName}`);
};
