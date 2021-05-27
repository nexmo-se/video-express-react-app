import axios from 'axios';

export const getCredentials = async roomName => {
  return axios
    .get(`http://localhost:8000/session/${roomName}`)
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
