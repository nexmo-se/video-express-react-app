import axios from 'axios';

let API_URL = `${process.env.REACT_APP_API_URL_DEVELOPMENT}/auth/`;
if (process.env.NODE_ENV === 'production') {
  API_URL = `${process.env.REACT_APP_API_URL_PRODUCTION}${process.env.REACT_APP_BASENAME}/auth/`;
}

export const getCredentials = async (roomName) => {
  return axios
    .get(`${API_URL}/session/${roomName}`)
    .then((response) => {
      const { apiKey, sessionId, room, token } = response.data;
      return {
        apikey: apiKey,
        sessionId,
        token,
        room,
      };
    })
    .catch((err) => {
      return {
        apikey: '',
        sessionId: '',
        token: '',
        room: '',
      };
    });
};
