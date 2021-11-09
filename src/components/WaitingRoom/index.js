import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import useStyles from './styles';
import usePreviewPublisher from '../../hooks/usePreviewPublisher';
import AudioSettings from '../AudioSetting';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import VideoSettings from '../VideoSetting';
import DeviceAccessAlert from '../DeviceAccessAlert';
import { UserContext } from '../../context/UserContext';
import LinearProgress from '@material-ui/core/LinearProgress';
import { DEVICE_ACCESS_STATUS } from './../constants';
import useBackgroundBlur from '../../hooks/useBackgroundBlur';
import * as VideoEffects from '@vonage/video-effects';

export default function WaitingRoom({ location }) {
  const track = useRef(null);
  const { BackgroundBlurEffect } = VideoEffects;
  const { destroyTracks, startBackgroundBlur } = useBackgroundBlur();
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
  const [backgroundBlur, setBackgroundBlur] = useState(
    user.videoEffects.backgroundBlur
  );
  const {
    createPreview,
    destroyPreview,
    previewPublisher,
    logLevel,
    previewMediaCreated,
    deviceInfo,
    accessAllowed,
  } = usePreviewPublisher();

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

  const redirectHttps = React.useCallback(() => {
    const url = window.location.href;
    if (
      url.toString().indexOf('http://') === 0 &&
      url.toString().indexOf('http://localhost') !== 0
    ) {
      window.location.href = window.location.href
        .toString()
        .replace('http://', 'https://');
    } else {
      return;
    }
  }, []);

  const handleJoinClick = () => {
    if (validateForm()) {
      localStorage.setItem('username', userName);
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
      setRoomName('');
      return;
    }
    setIsRoomNameInvalid(false);
    setRoomName(roomName);
  };

  const onChangeParticipantName = (e) => {
    const userName = e.target.value;
    if (userName === '' || userName.trim() === '') {
      // Space detected
      setUserName('');
      return;
    }
    setIsUserNameInvalid(false);
    setUserName(userName);
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

  const handleChangeBackgroundBlur = React.useCallback(async () => {
    if (backgroundBlur) {
      setBackgroundBlur(false);
      destroyPreview();
      destroyTracks();
      createPreview(waitingRoomVideoContainer.current);
    } else {
      setBackgroundBlur(true);
      destroyPreview();
      // const mediaTrack = await getUserMedia();
      // track.current = mediaTrack;
      // const backgroundBlurObject = new BackgroundBlurEffect({
      //   assetsPath: process.env.REACT_APP_ASSETS_PATH,
      // });
      // const outputVideoStream = backgroundBlurObject.startEffect(mediaTrack);
      const outputVideoStream = await startBackgroundBlur();
      console.log(outputVideoStream);
      // await backgroundBlurObject.loadModel();
      createPreview(waitingRoomVideoContainer.current, {
        videoSource: outputVideoStream.getVideoTracks()[0],
      });
    }
  }, [
    BackgroundBlurEffect,
    backgroundBlur,
    createPreview,
    destroyPreview,
    destroyTracks,
    startBackgroundBlur,
  ]);

  useEffect(() => {
    redirectHttps();
    if (localStorage.getItem('username')) {
      setUserName(localStorage.getItem('username'));
    }
  }, [redirectHttps]);

  useEffect(() => {
    if (
      localAudio !== user.defaultSettings.publishAudio ||
      localVideo !== user.defaultSettings.publishVideo ||
      localAudioSource !== user.defaultSettings.audioSource ||
      localVideoSource !== user.defaultSettings.videoSource ||
      backgroundBlur !== user.videoEffects.backgroundBlur
    ) {
      setUser({
        ...user,
        videoEffects: { backgroundBlur: backgroundBlur },
        defaultSettings: {
          publishAudio: localAudio,
          publishVideo: localVideo,
          audioSource: localAudioSource,
          videoSource: localVideoSource,
        },
      });
    }
  }, [
    localAudio,
    localVideo,
    user,
    setUser,
    localAudioSource,
    localVideoSource,
    backgroundBlur,
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
    previewMediaCreated,
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
      destroyTracks();
      destroyPreview();
    };
  }, [createPreview, destroyPreview]);

  return (
    <>
      <div className={classes.waitingRoomContainer}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
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
              {deviceInfo && previewMediaCreated && (
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Select Audio Source
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={audioDevice}
                    onChange={handleAudioSource}
                  >
                    {deviceInfo.audioInputDevices.map((device) => (
                      <MenuItem key={device.deviceId} value={device.deviceId}>
                        {device.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {deviceInfo && previewMediaCreated && (
                <FormControl>
                  <InputLabel id="video">Select Video Source</InputLabel>
                  {deviceInfo.videoInputDevices && (
                    <Select
                      labelId="video"
                      id="demo-simple-select"
                      value={videoDevice}
                      onChange={handleVideoSource}
                    >
                      {deviceInfo.videoInputDevices.map((device) => (
                        <MenuItem key={device.deviceId} value={device.deviceId}>
                          {device.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </FormControl>
              )}
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
          <FormControlLabel
            control={
              <Checkbox
                checked={backgroundBlur}
                onChange={handleChangeBackgroundBlur}
              />
            }
            label="Background Blur"
          />
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
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
      {accessAllowed !== DEVICE_ACCESS_STATUS.ACCEPTED && (
        <DeviceAccessAlert accessStatus={accessAllowed}></DeviceAccessAlert>
      )}
    </>
  );
}
