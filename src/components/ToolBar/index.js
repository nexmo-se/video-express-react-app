import { useState, useEffect } from 'react';
import style from './index.css';

import MuteAudioButton from 'components/MuteAudioButton';
import MuteVideoButton from 'components/MuteVideoButton';
import RecordingButton from 'components/RecordingButton';
import MuteAll from 'components/MuteAllButton';
import ScreenSharingButton from 'components/ScreenSharingButton';
import ExitButton from 'components/ExitButton';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

export default function ToolBar({ room, participants }) {
  const { roomName } = useParams();
  const { push } = useHistory();
  const [hasAudio, setHasAudio] = useState(null);
  const [hasVideo, setHasVideo] = useState(null);
  const [areAllMuted, setAllMuted] = useState(false);

  const handleMuteAll = () => {
    if (!areAllMuted) {
      participants.map(participant => {
        participant.camera.disableAudio();
      });

      setAllMuted(true);
    } else {
      participants.map(participant => {
        participant.camera.enableAudio();
      });
      setAllMuted(false);
    }
  };

  const exitFunction = () => {
    if (room) {
      push(`${roomName}/${room.roomId}/end`);
    }
  };

  const toggleVideo = () => {
    if (room) {
      const camera = room.camera;
      const isVideoEnabled = camera.isVideoEnabled();
      if (isVideoEnabled) {
        setHasVideo(true);
        camera.disableVideo();
      } else {
        setHasVideo(false);
        camera.enableVideo();
      }
    }
  };
  const toggleAudio = () => {
    if (room) {
      const camera = room.camera;
      const isAudioEnabled = camera.isAudioEnabled();
      if (isAudioEnabled) {
        setHasAudio(true);
        camera.disableAudio();
      } else {
        setHasAudio(false);
        camera.enableAudio();
      }
    }
  };

  return (
    <div id="flex-container">
      <div id="layoutcontrol">
        <MuteVideoButton toggleVideo={toggleVideo} hasVideo={hasVideo} />
        <MuteAudioButton toggleAudio={toggleAudio} hasAudio={hasAudio} />
        <RecordingButton room={room} />
        <ScreenSharingButton room={room} />
        <MuteAll handleMuteAll={handleMuteAll} areAllMuted={areAllMuted} />
        <ExitButton exitFunction={exitFunction} />
      </div>
    </div>
  );
}
