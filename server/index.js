const path = require('path');
let env = process.env.NODE_ENV || 'development';
const envPath = path.join(__dirname, '..');
console.log('envPath', envPath);
require('dotenv').config({ path: `${envPath}/.env.${env}` });
const cors = require('cors');
console.log('Node Running Environement:', env);
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); // create express app
const opentok = require('./opentok/opentok');
app.use(cors());
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
        apiKey: data.apiKey,
      });
    } else {
      const data = await opentok.getCredentials();
      sessions[roomName] = data.sessionId;
      res.json({
        sessionId: data.sessionId,
        token: data.token,
        apiKey: data.apiKey,
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
      status: response.status,
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
      status: 'stopped',
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get('/archive/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const archives = await opentok.listArchives(sessionId);
    res.json(archives);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
if (env === 'production') {
  console.log('Setting Up express.static for prod');
  const buildPath = path.join(__dirname, '..', 'build');
  app.use(express.static(buildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
}

const serverPort = process.env.SERVER_PORT || process.env.PORT || 5000;
// start express server on port 5000
app.listen(serverPort, () => {
  console.log('server started on port', serverPort);
});
