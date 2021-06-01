import { useCallback } from 'react';
import VideocamIcon from '@material-ui/icons/Videocam';

export default function MuteVideoButton({ room }) {
  const toggleVideo = useCallback(() => {
    if (room) {
      const camera = room.camera;
      const isVideoEnabled = camera.isVideoEnabled();
      isVideoEnabled ? camera.disableVideo() : camera.enableVideo();
    }
  }, [room]);

  return (
    <button className="buttons" onClick={toggleVideo}>
      Toggle Video
    </button>
  );
}
