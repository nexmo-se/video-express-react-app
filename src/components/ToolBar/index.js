import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as VideoExpress from "@vonage/video-express";
import MuteAudioButton from "components/MuteAudioButton";
import MuteVideoButton from "components/MuteVideoButton";
// import SpeakerButton from 'components/SpeakerButton';
import SpeakerSelector from "components/SpeakerSelector";
import RecordingButton from "components/RecordingButton";
import LayoutButton from "components/LayoutButton";
import MuteAll from "components/MuteAllButton";
import ReactionsButton from "components/ReactionsButton";
import ScreenSharingButton from "components/ScreenSharingButton";
import EndCallButton from "components/EndCallButton";
import VideoFilterButton from "components/VideoFilterButton";
import styles from "./styles";
import { useParams } from "react-router";
import { useTheme } from "@material-ui/core";

import MoreOptionsButton from "components/MoreOptionsButton";

export default function ToolBar({
  room,
  connected,
  cameraPublishing,
  isScreenSharing,
  startScreenSharing,
  stopScreenSharing,
  participants,
  localParticipant,
}) {
  const { roomName } = useParams();
  const theme = useTheme();
  const { push } = useHistory();
  const [hasAudio, setHasAudio] = useState(true);
  const [hasVideo, setHasVideo] = useState(true);
  const [areAllMuted, setAllMuted] = useState(false);
  const classes = styles();
  const isMobileWidth = useMediaQuery(theme.breakpoints.down("xs"));

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

  const getVideoSource = () => {
    if (room && room.camera) {
      return room.camera.getVideoDevice();
    }
  };

  const changeVideoSource = (videoId) => {
    room.camera.setVideoDevice(videoId);
  };
  const changeAudioSource = (audioId) => {
    room.camera.setAudioDevice(audioId);
  };

  const changeAudioOutput = async (audioOutputDeviceId) => {
    await VideoExpress.setAudioOutputDevice(audioOutputDeviceId);
  };

  const getCurrentAudioOutput = async () => {
    try {
      const currentAudioOutput = await VideoExpress.getActiveAudioOutputDevice();
      return currentAudioOutput.deviceId;
    } catch (e) {
      return e;
    }
  };

  const getAudioSource = async () => {
    if (room && room.camera) {
      const audioDevice = await room.camera.getAudioDevice();
      return audioDevice.deviceId;
    }
  };

  const endCall = () => {
    if (room) {
      push(`${roomName}/${room.roomId}/end`);
      room.leave();
    }
  };

  useEffect(() => {
    if (connected) {
      const isAudioEnabled = room && room.camera && room.camera.isAudioEnabled() ? true : false;
      const isVideoEnabled = room && room.camera && room.camera.isVideoEnabled() ? true : false;
      setHasAudio(isAudioEnabled);
      setHasVideo(isVideoEnabled);
    }
    // if (room) console.log(getParticipantsList());
  }, [connected, room]);

  return isMobileWidth ? (
    <div className={classes.toolbarMobileContainer}>
      <MuteAudioButton toggleAudio={toggleAudio} hasAudio={hasAudio} classes={classes} changeAudioSource={changeAudioSource} />
      <EndCallButton classes={classes} handleEndCall={endCall} />
      <MuteVideoButton toggleVideo={toggleVideo} hasVideo={hasVideo} classes={classes} changeVideoSource={changeVideoSource} />
    </div>
  ) : (
    <div className={classes.toolbarContainer}>
      <MoreOptionsButton classes={classes} participants={participants} room={room} localParticipant={localParticipant} />
      <MuteAudioButton
        toggleAudio={toggleAudio}
        hasAudio={hasAudio}
        classes={classes}
        changeAudioSource={changeAudioSource}
        getAudioSource={getAudioSource}
        cameraPublishing={cameraPublishing}
      />

      <MuteVideoButton
        toggleVideo={toggleVideo}
        hasVideo={hasVideo}
        classes={classes}
        getVideoSource={getVideoSource}
        cameraPublishing={cameraPublishing}
        changeVideoSource={changeVideoSource}
      />
      {VideoExpress.hasMediaProcessorSupport() && <VideoFilterButton classes={classes} room={room} />}
      {/* <SpeakerButton
        cameraPublishing={cameraPublishing}
        changeAudioOutput={changeAudioOutput}
        getCurrentAudioOutput={getCurrentAudioOutput}
        classes={classes}
      /> */}
      <SpeakerSelector room={room} changeAudioOutput={changeAudioOutput} getCurrentAudioOutput={getCurrentAudioOutput} classes={classes} />

      <RecordingButton room={room} classes={classes} />
      <ScreenSharingButton
        isScreenSharing={isScreenSharing}
        startScreenSharing={startScreenSharing}
        stopScreenSharing={stopScreenSharing}
        classes={classes}
      />
      <MuteAll handleMuteAll={handleMuteAll} areAllMuted={areAllMuted} classes={classes} />
      <ReactionsButton handleMuteAll={handleMuteAll} areAllMuted={areAllMuted} classes={classes} room={room} />
      <LayoutButton classes={classes} room={room} />
      <EndCallButton classes={classes} handleEndCall={endCall} />
    </div>
  );
}
