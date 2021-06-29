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
import { useParams } from 'react-router';
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
  const [devices, setDevices] = useState(null);
  let [audioDevice, setAudioDevice] = useState('');
  let [videoDevice, setVideoDevice] = useState('');

  const handleChangeAudio = event => {
    console.log(event.target);
    setAudioDevice(event.target.value);
    const audioDeviceId = devices.audioInputDevices.find(
      device => device.label === event.target.value
    ).deviceId;
    previewPublisher.setAudioDevice(audioDeviceId);
  };
  const handleChangeVideo = event => {
    setVideoDevice(event.target.value);
    const videoDeviceId = devices.videoInputDevices.find(
      device => device.label === event.target.value
    ).deviceId;
    previewPublisher.setVideoDevice(videoDeviceId);
  };

  const {
    createPreview,
    destroyPreview,
    previewPublisher,
    logLevel
  } = usePreviewPublisher();
  const { deviceInfo } = useDevices();

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

  const onChangeRoomName = e => {
    const roomName = e.target.value;
    if (roomName === '' || roomName.trim() === '') {
      // Space detected
      return;
    }
    console.log('onChangeRoomName', roomName);
    setIsRoomNameInvalid(false);
    setRoomName(roomName);
  };

  const onChangeParticipantName = e => {
    const userName = e.target.value;
    if (userName === '' || userName.trim() === '') {
      // Space detected
      return;
    }
    setIsUserNameInvalid(false);
    setUserName(e.target.value);
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      handleJoinClick();
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
        ...user,
        defaultSettings: {
          publishAudio: localAudio,
          publishVideo: localVideo
        }
      });
    }
  }, [localAudio, localVideo, user, setUser]);

  useEffect(() => {
    if (userName !== user.userName) {
      setUser({ ...user, userName: userName });
    }
  }, [userName, user, setUser]);

  useEffect(() => {
    if (deviceInfo) {
      setDevices(deviceInfo);
      console.log(deviceInfo.audioInputDevices[0]);
      setAudioDevice(deviceInfo?.audioInputDevices?.[0]?.label);
      setVideoDevice(deviceInfo?.videoInputDevices?.[0]?.label);
    }
    // console.log(deviceInfo.audioInputDevices[0].label);

    //
  }, [deviceInfo]);

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

  /* useEffect(() => {
    if (previewPublisher) {
      previewPublisher.on('audioLevelUpdated', (audioLevel) => {
        calculateAudioLevel(audioLevel);
      });
    }
  }, [previewPublisher, calculateAudioLevel]); */

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
          <div>
            <TextField
              id="standard-select-currency"
              defaultValue="audio"
              autowidth
              select
              label="Audio Source"
              value={audioDevice}
              onChange={handleChangeAudio}
              helperText="Please select your Audio device"
            >
              {devices &&
                devices.audioInputDevices.map(option => (
                  <MenuItem key={option.label} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
            </TextField>
          </div>
          <div>
            <TextField
              id="standard-select-currency"
              defaultValue="video"
              autowidth
              select
              label="Video Source"
              value={videoDevice}
              onChange={handleChangeVideo}
              helperText="Please select your video device"
            >
              {devices &&
                devices.videoInputDevices.map(option => (
                  <MenuItem key={option.label} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
            </TextField>
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
