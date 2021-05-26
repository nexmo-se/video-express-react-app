import { useParams } from 'react-router';
import { getCredentials } from '../../api/fetchCreds';

export default function VideoRoom() {
  let { roomName } = useParams();
  // useEffect(() => {}, []);

  console.log(roomName);
  return <div>Video Room</div>;
}
