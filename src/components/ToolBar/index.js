import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import MuteAudioButton from 'components/MuteAudioButton';
import MuteVideoButton from 'components/MuteVideoButton';
import RecordingButton from 'components/RecordingButton';
import MuteAll from 'components/MuteAllButton';
import ScreenSharingButton from 'components/ScreenSharingButton';
import EndCallButton from 'components/EndCallButton';
import styles from './styles';
import { useParams } from 'react-router';
import { useTheme } from '@material-ui/core';

export default function ToolBar({
  room,
  participants,
  connected,
  publisherIsSpeaking,
}) {
  const { roomName } = useParams();
  const theme = useTheme();
  const { push } = useHistory();
  const [hasAudio, setHasAudio] = useState(true);
  const [hasVideo, setHasVideo] = useState(true);
  const [areAllMuted, setAllMuted] = useState(false);
  const classes = styles();
  const isMobileWidth = useMediaQuery(theme.breakpoints.down('xs'));

  const handleMuteAll = () => {
    if (!areAllMuted) {
      participants.map((participant) => participant.camera.disableAudio());

      setAllMuted(true);
    } else {
      participants.map((participant) => participant.camera.enableAudio());
      setAllMuted(false);
    }
  };
  const toggleVideo = () => {
    if (room && room.camera) {
      const { camera } = room;
      const isVideoEnabled = camera.isVideoEnabled();
      if (isVideoEnabled) {
        camera.disableVideo();
        setHasVideo(false);
      } else {
        camera.enableVideo();
        setHasVideo(true);
      }
    }
  };
  const toggleAudio = () => {
    if (room && room.camera) {
      const camera = room.camera;
      const isAudioEnabled = camera.isAudioEnabled();
      if (isAudioEnabled) {
        camera.disableAudio();
        setHasAudio(false);
      } else {
        camera.enableAudio();
        setHasAudio(true);
      }
    }
  };

  const endCall = () => {
    if (room) {
      push(`${roomName}/${room.roomId}/end`);
      room.leave();
    }
  };

  useEffect(() => {
    console.log('[toolbar] useEffect - Connected', connected);
    if (connected) {
      const isAudioEnabled =
        room && room.camera && room.camera.isAudioEnabled() ? true : false;
      const isVideoEnabled =
        room && room.camera && room.camera.isVideoEnabled() ? true : false;
      setHasAudio(isAudioEnabled);
      setHasVideo(isVideoEnabled);
    }
  }, [connected, room]);

  return isMobileWidth ? (
    <div className={classes.toolbarMobileContainer}>
      <MuteAudioButton
        toggleAudio={toggleAudio}
        hasAudio={hasAudio}
        classes={classes}
        publisherIsSpeaking={publisherIsSpeaking}
      />
      <EndCallButton classes={classes} handleEndCall={endCall} />
      <MuteVideoButton
        toggleVideo={toggleVideo}
        hasVideo={hasVideo}
        classes={classes}
      />
      {/* <RecordingButton room={room} classes={classes} />
      <ScreenSharingButton room={room} classes={classes} />
      <MuteAll
        handleMuteAll={handleMuteAll}
        areAllMuted={areAllMuted}
        classes={classes}
      /> */}
    </div>
  ) : (
    <div className={classes.toolbarContainer}>
      <MuteAudioButton
        toggleAudio={toggleAudio}
        hasAudio={hasAudio}
        classes={classes}
        publisherIsSpeaking={publisherIsSpeaking}
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
