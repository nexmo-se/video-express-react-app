import { useState } from 'react';
import style from './index.css';

export default function ControlBar({ camera, room }) {
  const [screen, setScreen] = useState(null);
  return (
    <div id="layoutcontrol">
      <button
        className="buttons"
        onClick={() => {
          const isVideoEnabled = camera.isVideoEnabled();
          isVideoEnabled ? camera.disableVideo() : camera.enableVideo();
        }}
      >
        Mute me
      </button>
      <button
        className="buttons"
        onClick={async () => {
          await room.startScreensharing();
          setScreen(room.screen);
        }}
      >
        share screen
      </button>
    </div>
  );
}
