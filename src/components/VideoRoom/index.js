import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCredentials } from '../../api/fetchCreds';
import style from '../VideoRoom/index.css';
import { useRoom } from '../../hooks/useRoom';

export default function VideoRoom() {
  const [credentials, setCredentials] = useState(null);
  const { createCall } = useRoom({ credentials });
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

  return credentials ? (
    <div id="callContainer">
      <div id="roomContainer"></div>
    </div>
  ) : null;
}
