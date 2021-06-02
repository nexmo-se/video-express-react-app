import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { getCredentials } from '../../api/fetchCreds';
import styles from './styles.js';
import { useRoom } from '../../hooks/useRoom';

import SingleParticipantView from '../SingleparticipantView/index';
import ToolBar from 'components/ToolBar';
import MuteParticipantsButton from 'components/MuteparticipantButton';

export default function VideoRoom() {
  const [credentials, setCredentials] = useState(null);
  const { createCall, subscribersCount, room, participants } = useRoom();
  const roomContainer = useRef();
  const classes = styles();
  let { roomName } = useParams();

  useEffect(() => {
    try {
      getCredentials(roomName).then(({ apikey, sessionId, token }) => {
        setCredentials({ apikey, sessionId, token });
      });
    } catch (err) {
      console.log(err);
    }
  }, [roomName]);

  useEffect(() => {
    if (credentials) {
      createCall(roomContainer.current, credentials);
    }
  }, [createCall, credentials]);

  return (
    <div id="callContainer" className={classes.callContainer}>
      <div
        id="roomContainer"
        className={classes.roomContainer}
        ref={roomContainer}
      >
        {/* <MuteParticipantsButton /> */}
        {participants.length === 0 ? (
          <SingleParticipantView roomName={roomName} />
        ) : null}
      </div>
      <ToolBar room={room} participants={participants}></ToolBar>
    </div>
  );
}
