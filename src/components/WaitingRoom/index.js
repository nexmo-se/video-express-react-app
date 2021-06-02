import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, TextField } from '@material-ui/core';
import useStyles from './styles';
import usePreviewPublisher from '../../hooks/usePreviewPublisher';
import AudioSettings from '../AudioSetting';
import VideoSettings from '../VideoSetting';

const defaultLocalAudio = true;
const defaultLocalVideo = true;

export default function WaitingRoom() {
  const classes = useStyles();
  const { push } = useHistory();
  const waitingRoomVideoContainer = useRef();

  const [roomName, setRoomName] = useState('');
  const [localAudio, setLocalAudio] = useState(defaultLocalAudio);
  const [localVideo, setLocalVideo] = useState(defaultLocalVideo);
  const { createPreview, destroyPreview, previewPublisher } =
    usePreviewPublisher();

  const handleJoinClick = () => {
    if (!roomName) {
      return;
    }
    push(`room/${roomName}`);
  };

  const onChangeRoomName = (e) => {
    const roomName = e.target.value;
    setRoomName(roomName);
  };

  const handleAudioChange = React.useCallback((e) => {
    setLocalAudio(e.target.checked);
  }, []);

  const handleVideoChange = React.useCallback((e) => {
    setLocalVideo(e.target.checked);
  }, []);

  useEffect(() => {
    console.log('UseEffect - localAudio');
    if (previewPublisher) {
      console.log('previewPublisher', previewPublisher);
      if (previewPublisher.isAudioEnabled()) {
        previewPublisher.disableAudio();
      } else {
        previewPublisher.enableAudio();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localAudio]);

  useEffect(() => {
    console.log('UseEffect - LocalVideo');
    if (previewPublisher) {
      if (previewPublisher.isVideoEnabled()) {
        previewPublisher.disableVideo();
      } else {
        previewPublisher.enableVideo();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localVideo]);

  useEffect(() => {
    createPreview(document.getElementById('waiting-room-video-container'));
    return () => {
      destroyPreview();
    };
  }, [createPreview, destroyPreview]);

  return (
    <div className={classes.waitingRoomContainer}>
      <Grid container direction="column" justify="center" alignItems="center">
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="room-name"
            label="Room Name"
            name="roomName"
            autoComplete="Room Name"
            autoFocus
            helperText={roomName === '' ? 'Empty field!' : ' '}
            value={roomName}
            onChange={onChangeRoomName}
          />
        </form>
        <div
          id="waiting-room-video-container"
          className={classes.waitingRoomVideoPreview}
          ref={waitingRoomVideoContainer}
        ></div>
        <div className={classes.deviceContainer}>
          <AudioSettings
            className={classes.deviceSettings}
            hasAudio={localAudio}
            onAudioChange={handleAudioChange}
          />
          <VideoSettings
            className={classes.deviceSettings}
            hasVideo={localVideo}
            onVideoChange={handleVideoChange}
          />
        </div>
      </Grid>
      <Grid container direction="column" justify="center" alignItems="center">
        <Button variant="contained" color="primary" onClick={handleJoinClick}>
          Join Call
        </Button>
      </Grid>
    </div>
  );
}
