import { useState } from 'react';
import style from './index.css';

export default function ToolBar({ room }) {
  const [screen, setScreen] = useState(null);
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
    <div id="layoutcontrol">
      <button className="buttons" onClick={toggleVideo}>
        Toggle video
      </button>
      <button className="buttons" onClick={startScreenSharing}>
        share screen
      </button>
    </div>
  );
}
