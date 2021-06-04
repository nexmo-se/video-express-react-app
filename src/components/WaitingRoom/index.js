import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, TextField } from '@material-ui/core';
import useStyles from './styles';
import usePreviewPublisher from '../../hooks/usePreviewPublisher';
import AudioSettings from '../AudioSetting';
import VideoSettings from '../VideoSetting';
import { UserContext } from '../../context/UserContext';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';

export default function WaitingRoom() {
  const location = useLocation();
  const { room } = useParams();
  const classes = useStyles();
  const { push } = useHistory();
  const { user, setUser } = useContext(UserContext);
  const waitingRoomVideoContainer = useRef();

  const [roomName, setRoomName] = useState(room);
  const [userName, setUserName] = useState(user.userName);
  // const [localName, setLocalName] = useState(user.userName);
  const [localAudio, setLocalAudio] = useState(
    user.defaultSettings.publishAudio
  );
  const [localVideo, setLocalVideo] = useState(
    user.defaultSettings.publishVideo
  );
  const {
    createPreview,
    destroyPreview,
    previewPublisher
  } = usePreviewPublisher();

  const isInWaitingRoom = () => {
    if (location.pathname.split('/')[1] === 'waitingroom') {
      return true;
    }
    return false;
  };

  const handleJoinClick = () => {
    if (!roomName) {
      return;
    }
    isInWaitingRoom() ? push(`/room/${roomName}`) : push(`room/${roomName}`);
  };

  const onChangeRoomName = e => {
    const roomName = e.target.value;
    setRoomName(roomName);
  };

  // const onChangeParticipantName = e => {
  //   // const userName = e.target.value;
  //   setUserName(e.target.value);
  // };

  const onChangeParticipantName = React.useCallback(e => {
    setUserName(e.target.value);
  }, []);

  const onKeyDown = e => {
    if (e.keyCode === 13 && e.target.value) {
      push(`room/${e.target.value}`);
    }
  };
  const handleAudioChange = React.useCallback(e => {
    setLocalAudio(e.target.checked);
  }, []);

  const handleVideoChange = React.useCallback(e => {
    setLocalVideo(e.target.checked);
  }, []);

  useEffect(() => {
    if (
      localAudio !== user.defaultSettings.publishAudio ||
      localVideo !== user.defaultSettings.publishVideo
    ) {
      setUser({
        defaultSettings: {
          publishAudio: localAudio,
          publishVideo: localVideo
        }
      });
    }
  }, [localAudio, localVideo, user, setUser]);

  // useEffect(() => {
  //   if (userName !== user.userName) {
  //     setUser({
  //       userName: userName
  //     });
  //   }
  // }, [userName, setUser]);

  useEffect(() => {
    console.log('UseEffect - localAudio', localAudio);
    if (previewPublisher) {
      if (localAudio && !previewPublisher.isAudioEnabled()) {
        previewPublisher.enableAudio();
      } else if (!localAudio && previewPublisher.isAudioEnabled()) {
        previewPublisher.disableAudio();
      }
    }
  }, [localAudio, previewPublisher]);

  useEffect(() => {
    console.log('UseEffect - LocalVideo', localVideo);
    if (previewPublisher) {
      if (localVideo && !previewPublisher.isVideoEnabled()) {
        previewPublisher.enableVideo();
      } else if (!localVideo && previewPublisher.isVideoEnabled()) {
        previewPublisher.disableVideo();
      }
    }
  }, [localVideo, previewPublisher]);

  useEffect(() => {
    if (waitingRoomVideoContainer.current) {
      createPreview(waitingRoomVideoContainer.current);
    }

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
            disabled={room != null}
            required
            fullWidth
            id="room-name"
            label="Room Name"
            name="roomName"
            autoComplete="Room Name"
            autoFocus
            helperText={roomName === '' ? 'Empty field!' : ' '}
            value={roomName ? roomName : ''}
            onChange={onChangeRoomName}
            onKeyDown={onKeyDown}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="publisher-name"
            label="Name"
            name="name"
            autoComplete="Name"
            //autoFocus
            helperText={userName === '' ? 'Optional' : ' '}
            value={userName}
            onChange={onChangeParticipantName}
            onKeyDown={onKeyDown}
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
