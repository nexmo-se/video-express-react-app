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
  const [error, setError] = useState(null);
  const { createCall, subscribersCount, room, participants } = useRoom();
  const roomContainer = useRef();
  const classes = styles();
  let { roomName } = useParams();

  useEffect(() => {
    getCredentials(roomName)
      .then(({ data }) => {
        setCredentials({
          apikey: data.apiKey,
          sessionId: data.sessionId,
          token: data.token
        });
      })
      .catch(err => {
        setError(err);
        console.log(err);
      });
  }, [roomName]);

  useEffect(() => {
    if (credentials) {
      createCall(roomContainer.current, credentials);
    }
  }, [createCall, credentials]);

  if (error)
    return (
      <div className={classes.errorContainer}>
        There was an error fetching the data from the server
      </div>
    );

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
