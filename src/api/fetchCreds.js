import axios from 'axios';

let API_URL = `${process.env.REACT_APP_API_URL_DEVELOPMENT}`;
if (
  process.env.NODE_ENV === 'production' &&
  process.env.REACT_APP_API_URL_PRODUCTION
) {
  API_URL = `${process.env.REACT_APP_API_URL_PRODUCTION}`;
}

export const getCredentials = async (roomName) => {
  return axios.get(`${API_URL}/session/${roomName}`);
};
