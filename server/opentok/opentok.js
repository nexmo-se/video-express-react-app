const OpenTok = require('opentok');
require('dotenv').config();
const apiKey = process.env.apiKey;
const apiSecret = process.env.apiSecret;
let sessionId;
let sessions = [];

opentok = new OpenTok(apiKey, apiSecret);

const createSessionandToken = () => {
  return new Promise((resolve, reject) => {
    opentok.createSession({ mediaMode: 'routed' }, function(error, session) {
      if (error) {
        reject(error);
      } else {
        sessionId = session.sessionId;
        token = opentok.generateToken(sessionId);
        resolve({ sessionId: sessionId, token: token });
        //console.log("Session ID: " + sessionId);
      }
    });
  });
};

const createArchive = session => {
  return new Promise((resolve, reject) => {
    opentok.startArchive(session, function(error, archive) {
      if (error) {
        reject(error);
      } else {
        resolve(archive);
      }
    });
  });
};

const stopArchive = archive => {
  return new Promise((resolve, reject) => {
    opentok.stopArchive(archive, function(error, session) {
      if (error) {
        reject(error);
      } else {
        resolve(archive);
      }
    });
  });
};

const generateToken = sessionId => {
  token = opentok.generateToken(sessionId);
  return { token: token, apiKey: apiKey };
};

const initiateArchiving = async sessionId => {
  archive = await createArchive(sessionId);
  return archive;
};

const stopArchiving = async archiveId => {
  console.log(archiveId);
  const response = await stopArchive(archiveId);
  return response;
};

const getCredentials = async (session = null) => {
  data = await createSessionandToken(session);
  sessionId = data.sessionId;
  token = data.token;
  return { sessionId: sessionId, token: token, apiKey: apiKey };
  console.log(`sessionId:${sessionId}, token : ${token}`);
};

module.exports = {
  getCredentials,
  generateToken,
  initiateArchiving,
  stopArchiving
};
