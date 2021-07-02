import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import useStyles from './styles';
import usePreviewPublisher from '../../hooks/usePreviewPublisher';
import useDevices from '../../hooks/useDevices';
import AudioSettings from '../AudioSetting';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import VideoSettings from '../VideoSetting';
import { UserContext } from '../../context/UserContext';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function WaitingRoom({ location }) {
  const classes = useStyles();
  const { push } = useHistory();
  const { user, setUser } = useContext(UserContext);
  const waitingRoomVideoContainer = useRef();
  const roomToJoin = location?.state?.room || '';
  const [roomName, setRoomName] = useState(roomToJoin);
  const [userName, setUserName] = useState('');
  const [isRoomNameInvalid, setIsRoomNameInvalid] = useState(false);
  const [isUserNameInvalid, setIsUserNameInvalid] = useState(false);
  const [localAudio, setLocalAudio] = useState(
    user.defaultSettings.publishAudio
  );
  const [localVideo, setLocalVideo] = useState(
    user.defaultSettings.publishVideo
  );
  const [localVideoSource, setLocalVideoSource] = useState(undefined);
  const [localAudioSource, setLocalAudioSource] = useState(undefined);
  /* const [devices, setDevices] = useState(null); */
  let [audioDevice, setAudioDevice] = useState('');
  let [videoDevice, setVideoDevice] = useState('');

  const {
    createPreview,
    destroyPreview,
    previewPublisher,
    logLevel,
    previewMediaCreated
  } = usePreviewPublisher();
  const { deviceInfo } = useDevices();

  const handleVideoSource = React.useCallback(
    (e) => {
      const videoDeviceId = e.target.value;
      setVideoDevice(e.target.value);
      previewPublisher.setVideoDevice(videoDeviceId);
      setLocalVideoSource(videoDeviceId);
    },
    [previewPublisher, setVideoDevice, setLocalVideoSource]
  );

  const handleAudioSource = React.useCallback(
    (e) => {
      const audioDeviceId = e.target.value;
      setAudioDevice(audioDeviceId);
      previewPublisher.setAudioDevice(audioDeviceId);
      setLocalAudioSource(audioDeviceId);
    },
    [previewPublisher, setAudioDevice, setLocalAudioSource]
  );

  const handleJoinClick = () => {
    if (validateForm()) {
      push(`room/${roomName}`);
    }
  };

  const validateForm = () => {
    if (userName === '') {
      setIsUserNameInvalid(true);
      return false;
    } else if (roomName === '') {
      setIsRoomNameInvalid(true);
      return false;
    }
    return true;
  };

  const onChangeRoomName = (e) => {
    const roomName = e.target.value;
    if (roomName === '' || roomName.trim() === '') {
      // Space detected
      return;
    }
    console.log('onChangeRoomName', roomName);
    setIsRoomNameInvalid(false);
    setRoomName(roomName);
  };

  const onChangeParticipantName = (e) => {
    const userName = e.target.value;
    if (userName === '' || userName.trim() === '') {
      // Space detected
      return;
    }
    setIsUserNameInvalid(false);
    setUserName(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleJoinClick();
    }
  };

  const handleAudioChange = React.useCallback((e) => {
    setLocalAudio(e.target.checked);
  }, []);

  const handleVideoChange = React.useCallback((e) => {
    setLocalVideo(e.target.checked);
  }, []);

  useEffect(() => {
    if (
      localAudio !== user.defaultSettings.publishAudio ||
      localVideo !== user.defaultSettings.publishVideo ||
      localAudioSource !== user.defaultSettings.audioSource ||
      localVideoSource !== user.defaultSettings.videoSource
    ) {
      setUser({
        ...user,
        defaultSettings: {
          publishAudio: localAudio,
          publishVideo: localVideo,
          audioSource: localAudioSource,
          videoSource: localVideoSource
        }
      });
    }
  }, [
    localAudio,
    localVideo,
    user,
    setUser,
    localAudioSource,
    localVideoSource
  ]);

  useEffect(() => {
    if (userName !== user.userName) {
      setUser({ ...user, userName: userName });
    }
  }, [userName, user, setUser]);

  useEffect(() => {
    if (previewPublisher && previewMediaCreated && deviceInfo) {
      previewPublisher.getAudioDevice().then((currentAudioDevice) => {
        setAudioDevice(currentAudioDevice.deviceId);
      });
      const currentVideoDevice = previewPublisher.getVideoDevice();
      setVideoDevice(currentVideoDevice.deviceId);
    }
  }, [
    deviceInfo,
    previewPublisher,
    setAudioDevice,
    setVideoDevice,
    previewMediaCreated
  ]);

  useEffect(() => {
    if (previewPublisher) {
      if (localAudio && !previewPublisher.isAudioEnabled()) {
        previewPublisher.enableAudio();
      } else if (!localAudio && previewPublisher.isAudioEnabled()) {
        previewPublisher.disableAudio();
      }
    }
  }, [localAudio, previewPublisher]);

  useEffect(() => {
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
            required
            fullWidth
            disabled={roomToJoin !== ''}
            id="room-name"
            label="Room Name"
            name="roomName"
            autoComplete="Room Name"
            error={isRoomNameInvalid}
            autoFocus
            helperText={roomName === '' ? 'Empty Field' : ' '}
            value={roomName}
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
            error={isUserNameInvalid}
            required
            autoComplete="Name"
            helperText={userName === '' ? 'Empty Field' : ' '}
            value={userName}
            onChange={onChangeParticipantName}
            onKeyDown={onKeyDown}
          />
          <div className={classes.mediaSources}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Select Audio
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={audioDevice}
                onChange={handleAudioSource}
              >
                {deviceInfo &&
                  deviceInfo.audioInputDevices.map((device) => (
                    <MenuItem key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className={classes.mediaSources}>
            <FormControl>
              <InputLabel id="video">Video</InputLabel>
              <Select
                labelId="video"
                id="demo-simple-select"
                value={videoDevice}
                onChange={handleVideoSource}
              >
                {deviceInfo &&
                  deviceInfo.videoInputDevices.map((device) => (
                    <MenuItem key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
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
          <LinearProgress variant="determinate" value={logLevel} />
          <VideoSettings
            className={classes.deviceSettings}
            hasVideo={localVideo}
            onVideoChange={handleVideoChange}
          />
        </div>
      </Grid>
      <Grid container direction="column" justify="center" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleJoinClick}
          disabled={!roomName || !userName}
        >
          Join Call
        </Button>
      </Grid>
    </div>
  );
}
