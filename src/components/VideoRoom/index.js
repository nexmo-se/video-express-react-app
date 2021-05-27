import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCredentials } from '../../api/fetchCreds';
import style from '../VideoRoom/index.css';
import { useRoom } from '../../hooks/useRoom';

import SingleParticipantView from '../SingleparticipantView/index';

export default function VideoRoom() {
  const [credentials, setCredentials] = useState(null);
  const { createCall, subscribersCount, camera, room } = useRoom({
    credentials
  });
  const [screen, setScreen] = useState(null);
  let { roomName } = useParams();

  useEffect(() => {
    getCredentials(roomName).then(({ apikey, sessionId, token }) => {
      setCredentials({ apikey, sessionId, token });
    });
  }, [roomName]);

  useEffect(() => {
    if (credentials) {
      createCall(credentials);
    }
  }, [createCall, credentials]);

  useEffect(() => {
    if (camera) {
      console.log(camera);
    }
    if (screen) {
    }
  }, [subscribersCount, camera, screen]);

  // useEffect(() => {
  //   console.log(camera);
  // }, [camera]);

  return credentials ? (
    <div id="callContainer">
      <div id="roomContainer">
        {subscribersCount === 0 ? (
          <SingleParticipantView roomName={roomName} />
        ) : null}
      </div>
      <button
        onClick={async () => {
          camera.disableVideo();
          await room.startScreensharing();
          setScreen(room.screen);
          // room.setLayoutMode('active-speaker');
          // .then(() => console.log('sharing your screen'));
        }}
      >
        Mute me
      </button>
      {/* Controller Component */}
    </div>
  ) : null;
}
