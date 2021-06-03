import axios from 'axios';
let API_URL = `${process.env.REACT_APP_API_URL_DEVELOPMENT}/archive`;
if (process.env.NODE_ENV === 'production') {
  API_URL = `${process.env.REACT_APP_API_URL_PRODUCTION}/archive`;
}
const fetchRecordings = (sessionId) => {
  return axios.get(`${API_URL}/${sessionId}`);
};

const startRecording = (sessionId) => {
  return axios.post(`${API_URL}/start`, {
    session_id: sessionId,
  });
};

const stopRecording = (archiveId) => {
  return axios.get(`${API_URL}/stop/${archiveId}`);
};

export { fetchRecordings, startRecording, stopRecording };
