import axios from 'axios';

export const getCredentials = async roomName => {
  return axios
    .post(`${process.env.REACT_APP_SERVER_BASE_URL}/session/room`)
    .then(response => {
      const { apiKey, sessionId, room, token } = response.data;
      return {
        apikey: apiKey,
        sessionId,
        token,
        room
      };
    })
    .catch(err => {
      return {
        apikey: '',
        sessionId: '',
        token: '',
        room: ''
      };
    });
};
