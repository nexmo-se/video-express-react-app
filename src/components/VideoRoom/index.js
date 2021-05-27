import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCredentials } from '../../api/fetchCreds';
import style from '../VideoRoom/index.css';
import { useRoom } from '../../hooks/useRoom';

import SingleParticipantView from '../SingleparticipantView/index';

export default function VideoRoom() {
  const [credentials, setCredentials] = useState(null);
  const { createCall, subscribersCount, camera, room, participants } = useRoom({
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

  // useEffect(() => {
  //   if (camera) {
  //   }
  //   if (screen) {
  //   }
  // }, [subscribersCount, camera, screen]);
  // [subscribersCount]

  useEffect(() => {
    if (participants) console.log(participants);
  }, [participants]);

  return credentials ? (
    <div id="callContainer">
      <div id="roomContainer">
        {subscribersCount === 0 ? (
          <SingleParticipantView roomName={roomName} />
        ) : null}
      </div>

      {/* Controller Component */}
      {/* this will go on separate components */}
      <div id="layoutcontrol">
        <button
          className="buttons"
          onClick={() => {
            const isVideoEnabled = camera.isVideoEnabled();
            isVideoEnabled ? camera.disableVideo() : camera.enableVideo();
          }}
        >
          Mute me
        </button>
        <button
          className="buttons"
          onClick={async () => {
            await room.startScreensharing();
            setScreen(room.screen);
          }}
        >
          share screen
        </button>
      </div>
    </div>
  ) : null;
}
