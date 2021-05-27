import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCredentials } from '../../api/fetchCreds';
import style from '../VideoRoom/index.css';
import { useRoom } from '../../hooks/useRoom';

import SingleParticipantView from '../SingleparticipantView/index';

export default function VideoRoom() {
  const [credentials, setCredentials] = useState(null);
  const { createCall, participantsCount, camera, screen } = useRoom({
    credentials
  });
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
      console.log(screen);
    }
  }, [participantsCount, camera, screen]);

  // useEffect(() => {
  //   console.log(camera);
  // }, [camera]);

  return credentials ? (
    <div id="callContainer">
      <div id="roomContainer">
        {participantsCount === 0 ? (
          <SingleParticipantView roomName={roomName} />
        ) : null}
      </div>
      <button
        onClick={() => {
          camera.disableVideo();
        }}
      >
        Mute me
      </button>
    </div>
  ) : null;
}
