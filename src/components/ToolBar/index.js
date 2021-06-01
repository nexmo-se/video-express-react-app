import { useState, useEffect } from 'react';
import style from './index.css';

import MuteAudioButton from 'components/MuteAudioButton';
import MuteVideoButton from 'components/MuteVideoButton';
import RecordingButton from 'components/RecordingButton';
import MuteAll from 'components/MuteAllButton';
import ScreenSharingButton from 'components/ScreenSharingButton';

export default function ToolBar({ room, participants }) {
  const handleMuteAll = () => {
    if (participants) {
      participants.map(participant => {
        participant.camera.disableAudio();
      });
    }
  };

  const toggleVideo = () => {
    if (room) {
      const camera = room.camera;
      const isVideoEnabled = camera.isVideoEnabled();
      isVideoEnabled ? camera.disableVideo() : camera.enableVideo();
    }
  };
  const toggleAudio = () => {
    if (room) {
      const camera = room.camera;
      const isAudioEnabled = camera.isAudioEnabled();
      isAudioEnabled ? camera.disableAudio() : camera.enableAudio();
    }
  };

  return (
    <div id="layoutcontrol">
      <MuteVideoButton toggleVideo={toggleVideo} />
      <MuteAudioButton toggleAudio={toggleAudio} />
      <RecordingButton room={room} />
      <ScreenSharingButton room={room} />
      <MuteAll handleMuteAll={handleMuteAll} />
    </div>
  );
}
