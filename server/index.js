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
  const { session_id } = req.body;
  try {
    const response = await opentok.initiateArchiving(session_id);
    console.log(response);
    res.json({
      archiveId: response.id,
      status: response.status
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get('/archive/stop/:archiveId', async (req, res) => {
  const { archiveId } = req.params;
  try {
    const response = await opentok.stopArchiving(archiveId);
    console.log(response);
    res.json({
      archiveId: response,
      status: 'stopped'
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get('/archives/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const archives = await opentok.listArchives(sessionId);
    res.json(archives);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// start express server on port 5000
app.listen(process.env.PORT || 5000, () => {
  console.log('server started on port', process.env.PORT);
});
