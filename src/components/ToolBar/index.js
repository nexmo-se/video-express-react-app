import { useState } from 'react';
import style from './index.css';

import MuteAudioButton from 'components/MuteAudioButton';
import MuteVideoButton from 'components/MuteVideoButton';
import RecordingButton from 'components/RecordingButton';
import MuteAll from 'components/MuteAllButton';

export default function ToolBar({ room, participants }) {
  const [screen, setScreen] = useState(null);

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

  const muteAll = () => {
    if (participants) {
      participants.map(participant => {
        participant.camera.disableVideo();
      });
    }
  };

  return (
    <div id="layoutcontrol">
      <MuteVideoButton room={room} />
      <MuteAudioButton room={room} />
      <RecordingButton room={room} />
      <button className="buttons" onClick={startScreenSharing}>
        share screen
      </button>
      {/* <button className="buttons" onClick={muteAll}>
        Mute all
      </button> */}
      <MuteAll participants={participants} />
    </div>
  );
}
