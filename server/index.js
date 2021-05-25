let env = process.env.NODE_ENV || 'development';
if (!env || env === 'development') {
  require('dotenv').config();
} else {
  require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
}

const cors = require('cors');
const express = require('express');
const app = express(); // create express app
const opentok = require('./opentok/opentok');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());

let sessions = [];

// res.send('hello');

app.get('/session/:room', async (req, res) => {
  try {
    const { room: roomName } = req.params;
    const sessionDB = sessions.find(session => {
      if (session.roomName === roomName) {
        return true;
      } else {
        return false;
      }
    });

    if (!sessionDB) {
      const data = await opentok.getCredentials();
      sessions.push({
        sessionId: data.sessionId,
        roomName
      });
      res.json({
        sessionId: data.sessionId,
        token: data.token,
        apiKey: data.apiKey
      });
    } else {
      const data = opentok.generateToken(sessionDB.sessionId);
      res.json({
        sessionId: sessionDB.sessionId,
        token: data.token,
        apiKey: data.apiKey
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.post('/archive/start', async (req, res) => {
  console.log(req.body);
  const session_id = req.body.sessionId;
  console.log(session_id);
  try {
    const response = await opentok.initiateArchiving(session_id);
    res.json({
      archiveId: response.id,
      status: response.status
    });
  } catch (e) {
    res.send(e);
  }
});

app.get('/archive/stop/:archiveId', async (req, res) => {
  const archiveId = req.params.archiveId;
  try {
    const response = await opentok.stopRecording(archiveId);
    console.log(response);
    res.json({
      archiveId: response,
      status: 'stopped'
    });
  } catch (e) {
    res.send(e);
  }
});

// app.use('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
// });

// start express server on port 5000
app.listen(process.env.PORT || 5000, () => {
  console.log('server started on port', process.env.PORT);
});
