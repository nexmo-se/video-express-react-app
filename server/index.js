require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express(); // create express app
const opentok = require('./opentok/opentok');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const sessions = {};

app.get('/session/:room', async (req, res) => {
  try {
    const { room: roomName } = req.params;
    console.log(sessions);
    if (sessions[roomName]) {
      const data = opentok.generateToken(sessions[roomName]);
      res.json({
        sessionId: sessions[roomName],
        token: data.token,
        apiKey: data.apiKey
      });
    } else {
      const data = await opentok.getCredentials();
      sessions[roomName] = data.sessionId;
      res.json({
        sessionId: data.sessionId,
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
