import { useState, useEffect } from 'react';

import MuteAudioButton from 'components/MuteAudioButton';
import MuteVideoButton from 'components/MuteVideoButton';
import RecordingButton from 'components/RecordingButton';
import MuteAll from 'components/MuteAllButton';
import ScreenSharingButton from 'components/ScreenSharingButton';
import styles from './styles';

export default function ToolBar({ room, participants }) {
  const [hasAudio, setHasAudio] = useState(null);
  const [hasVideo, setHasVideo] = useState(null);
  const [areAllMuted, setAllMuted] = useState(false);
  const classes = styles();
  const handleMuteAll = () => {
    if (!areAllMuted) {
      participants.map((participant) => {
        participant.camera.disableAudio();
      });

      setAllMuted(true);
    } else {
      participants.map((participant) => {
        participant.camera.enableAudio();
      });
      setAllMuted(false);
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
    <div className={classes.toolbarContainer}>
      <MuteVideoButton toggleVideo={toggleVideo} hasVideo={hasVideo} />
      <MuteAudioButton toggleAudio={toggleAudio} hasAudio={hasAudio} />
      <RecordingButton room={room} />
      <ScreenSharingButton room={room} />
      <MuteAll handleMuteAll={handleMuteAll} areAllMuted={areAllMuted} />
    </div>
  );
}
