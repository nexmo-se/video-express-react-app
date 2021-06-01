import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCredentials } from '../../api/fetchCreds';
import style from '../VideoRoom/index.css';
import { useRoom } from '../../hooks/useRoom';

import SingleParticipantView from '../SingleparticipantView/index';
import ToolBar from 'components/ToolBar';
import MuteParticipantsButton from 'components/MuteparticipantButton';

export default function VideoRoom() {
  const [credentials, setCredentials] = useState(null);
  const { createCall, subscribersCount, room, participants } = useRoom();

  let { roomName } = useParams();

  useEffect(() => {
    try {
      getCredentials(roomName).then(({ apikey, sessionId, token }) => {
        setCredentials({ apikey, sessionId, token });
      });
    } catch {
      e => console.log(e);
    }
  }, [roomName]);

  useEffect(() => {
    if (credentials) {
      createCall(credentials);
    }
  }, [createCall, credentials]);

<<<<<<< HEAD
=======
  useEffect(() => {
    if (participants) console.log(participants);
  }, [participants]);

>>>>>>> b964e887ad2dac029d771586149784a59280c77b
  return (
    <div id="callContainer">
      <div id="roomContainer">
        {/* <MuteParticipantsButton /> */}
        {participants.length === 0 ? (
          <SingleParticipantView roomName={roomName} />
        ) : null}
      </div>
      <ToolBar room={room} participants={participants}></ToolBar>
    </div>
  );
}
