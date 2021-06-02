import { useState } from 'react';
import styles from './styles';

export default function ToolBar({ room }) {
  const [screen, setScreen] = useState(null);
  const classes = styles();
  console.log(room);
  // const camera = room.camera;

  const toggleVideo = () => {
    if (room) {
      const camera = room.camera;
      const isVideoEnabled = camera.isVideoEnabled();
      isVideoEnabled ? camera.disableVideo() : camera.enableVideo();
    }
    return;
  };

  const startScreenSharing = async () => {
    await room.startScreensharing();
    setScreen(room.screen);
  };
  return (
    <div className={classes.toolbarContainer}>
      <button className="buttons" onClick={toggleVideo}>
        Toggle video
      </button>
      <button className="buttons" onClick={startScreenSharing}>
        share screen
      </button>
    </div>
  );
}
