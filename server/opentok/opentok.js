const OpenTok = require('opentok');
const apiKey = process.env.VIDEO_API_API_KEY;
const apiSecret = process.env.VIDEO_API_API_SECRET;
if (!apiKey || !apiSecret) {
  throw new Error(
    'Missing config values for env params OT_API_KEY and OT_API_SECRET'
  );
}
let sessionId;

const opentok = new OpenTok(apiKey, apiSecret);

const createSessionandToken = () => {
  return new Promise((resolve, reject) => {
    opentok.createSession({ mediaMode: 'routed' }, function (error, session) {
      if (error) {
        reject(error);
      } else {
        sessionId = session.sessionId;
        const token = opentok.generateToken(sessionId);
        resolve({ sessionId: sessionId, token: token });
        //console.log("Session ID: " + sessionId);
      }
    });
  });
};

const createArchive = (session) => {
  return new Promise((resolve, reject) => {
    opentok.startArchive(
      session,
      { layout: { screenshareType: 'horizontalPresentation' } },
      function (error, archive) {
        if (error) {
          reject(error);
        } else {
          resolve(archive);
        }
      }
    );
  });
};

const stopArchive = (archive) => {
  return new Promise((resolve, reject) => {
    opentok.stopArchive(archive, function (error, session) {
      if (error) {
        reject(error);
      } else {
        resolve(archive);
      }
    });
  });
};

const generateToken = (sessionId) => {
  const token = opentok.generateToken(sessionId);
  return { token: token, apiKey: apiKey };
};

const initiateArchiving = async (sessionId) => {
  const archive = await createArchive(sessionId);
  return archive;
};

const stopArchiving = async (archiveId) => {
  console.log(archiveId);
  const response = await stopArchive(archiveId);
  return response;
};

const getCredentials = async (session = null) => {
  const data = await createSessionandToken(session);
  sessionId = data.sessionId;
  const token = data.token;
  return { sessionId: sessionId, token: token, apiKey: apiKey };
};
const listArchives = async (sessionId) => {
  return new Promise((resolve, reject) => {
    const options = { sessionId };
    opentok.listArchives(options, (error, archives) => {
      if (error) {
        reject(error);
      } else {
        resolve(archives);
      }
    });
  });
};

module.exports = {
  getCredentials,
  generateToken,
  initiateArchiving,
  stopArchiving,
  listArchives
};
