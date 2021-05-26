import { useParams } from 'react-router';

export default function VideoRoom() {
  let { roomName } = useParams();
  console.log(roomName);
  return <div>Video Room</div>;
}
