import { useParams } from 'react-router';
import { useEffect } from 'react';
import { getCredentials } from '../../api/fetchCreds';

export default function VideoRoom() {
  let { roomName } = useParams();
  useEffect(() => {
    getCredentials(roomName).then(({ apikey, sessionId, token }) => {
      console.log(apikey, sessionId, token);
    });
  }, [roomName]);

  console.log(roomName);
  return <div>Video Room</div>;
}
