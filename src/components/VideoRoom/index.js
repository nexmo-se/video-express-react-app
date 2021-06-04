import { useParams } from 'react-router';
import { useContext, useEffect, useRef, useState } from 'react';
import { getCredentials } from '../../api/fetchCreds';
import styles from './styles.js';
import useRoom from '../../hooks/useRoom';
import { UserContext } from '../../context/UserContext';

import SingleParticipantView from '../SingleparticipantView/index';
import ToolBar from 'components/ToolBar';

export default function VideoRoom() {
  const { user } = useContext(UserContext);
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
          token: data.token,
        });
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  }, [roomName]);

  useEffect(() => {
    if (credentials) {
      createCall(credentials, roomContainer.current, {
        ...user.defaultSettings,
      });
    }
  }, [createCall, credentials, user]);

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
