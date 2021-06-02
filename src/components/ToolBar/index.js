import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import MuteAudioButton from 'components/MuteAudioButton';
import MuteVideoButton from 'components/MuteVideoButton';
import RecordingButton from 'components/RecordingButton';
import MuteAll from 'components/MuteAllButton';
import ScreenSharingButton from 'components/ScreenSharingButton';
import EndCallButton from 'components/EndCallButton';
import styles from './styles';

export default function ToolBar({ room, participants }) {
  const [hasAudio, setHasAudio] = useState(null);
  const [hasVideo, setHasVideo] = useState(null);
  const [areAllMuted, setAllMuted] = useState(false);
  const { push } = useHistory();
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

  const endCall = () => {
    push(`${window.location.pathname}/end`);
  };

  return (
    <div className={classes.toolbarContainer}>
      <MuteAudioButton
        toggleAudio={toggleAudio}
        hasAudio={hasAudio}
        classes={classes}
      />
      <MuteVideoButton
        toggleVideo={toggleVideo}
        hasVideo={hasVideo}
        classes={classes}
      />
      <RecordingButton room={room} classes={classes} />
      <ScreenSharingButton room={room} classes={classes} />
      <MuteAll
        handleMuteAll={handleMuteAll}
        areAllMuted={areAllMuted}
        classes={classes}
      />
      <EndCallButton classes={classes} handleEndCall={endCall} />
    </div>
  );
}
