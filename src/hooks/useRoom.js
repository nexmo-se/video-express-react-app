import React, { useState, useRef, useCallback, useEffect } from "react";
import _ from "lodash";
import * as VideoExpress from "@vonage/video-express";

export default function useRoom() {
  let roomRef = useRef(null);
  let publisherOptionsRef = useRef(null);
  const [camera, setCamera] = useState(null);
  const [screen, setScreen] = useState(null);
  const [localParticipant, setLocalParticipant] = useState(null);
  const [connected, setConnected] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [networkStatus, setNetworkStatus] = useState(null);
  const [publisherIsSpeaking, setPublisherIsSpeaking] = useState(false);
  const [cameraPublishing, setCameraPublishing] = useState(false);

  const addParticipants = ({ participant }) => {
    setParticipants((prev) => [...prev, participant]);
  };

  const removeParticipants = ({ participant }) => {
    setParticipants((prev) => prev.filter((prevparticipant) => prevparticipant.id !== participant.id));
  };

  const addLocalParticipant = ({ room }) => {
    if (room) {
      setLocalParticipant({
        id: room.participantId,
        name: room.participantName,
      });
    }
  };

  const removeLocalParticipant = ({ participant }) => {
    setParticipants(null);
  };

  const onAudioLevel = React.useCallback((audioLevel) => {
    let movingAvg = null;
    if (movingAvg === null || movingAvg <= audioLevel) {
      movingAvg = audioLevel;
    } else {
      movingAvg = 0.8 * movingAvg + 0.2 * audioLevel;
    }
    // 1.5 scaling to map the -30 - 0 dBm range to [0,1]
    const currentLogLevel = Math.log(movingAvg) / Math.LN10 / 1.5 + 1;
    if (currentLogLevel > 0.4) {
      setPublisherIsSpeaking(true);
    } else {
      setPublisherIsSpeaking(false);
    }
  }, []);

  const addPublisherCameraEvents = () => {
    if (roomRef.current.camera) {
      roomRef.current.camera.on(
        "audioLevelUpdated",
        _.throttle((event) => onAudioLevel(event), 250)
      );
    }
  };

  const parseVideoFilter = (videoFilter) => {
    switch (videoFilter.filterName) {
      case "blur":
        return { type: "backgroundBlur", blurStrength: videoFilter.filterPayload };
      case "backgroundImage":
        // previewPublisher.setVideoFilter({ type: "backgroundReplacement", backgroundImgUrl: filterPayload });
        return { type: "backgroundReplacement", backgroundImgUrl: videoFilter.filterPayload };
      default:
        // do nothing
        return {};
    }
  };

  const startRoomListeners = useCallback(() => {
    if (roomRef.current) {
      roomRef.current.on("connected", () => {
        console.log("Room: connected");
      });
      roomRef.current.on("disconnected", () => {
        setNetworkStatus("disconnected");
        console.log("Room: disconnected");
      });
      roomRef.current.camera.on("created", () => {
        setCameraPublishing(true);
        console.log("camera publishing now");
      });
      roomRef.current.on("activeSpeakerChanged", (participant) => {
        console.log("Active speaker changed", participant);
      });

      roomRef.current.on("reconnected", () => {
        setNetworkStatus("reconnected");
        console.log("Room: reconnected");
      });
      roomRef.current.on("reconnecting", () => {
        setNetworkStatus("reconnecting");
        console.log("Room: reconnecting");
      });
      roomRef.current.on("participantJoined", (participant) => {
        console.log(participant);
        addParticipants({ participant: participant });
        console.log("Room: participant joined: ", participant);
      });
      roomRef.current.on("participantLeft", (participant, reason) => {
        removeParticipants({ participant: participant });
        console.log("Room: participant left", participant, reason);
      });
    }
  }, []);

  const createCall = useCallback(async ({ apikey, sessionId, token }, roomContainer, userName, videoFilter, publisherOptions) => {
    if (!apikey || !sessionId || !token) {
      throw new Error("Check your credentials");
    }

    roomRef.current = new VideoExpress.Room({
      apiKey: apikey,
      sessionId: sessionId,
      token: token,
      roomContainer: "roomContainer",
      maxVideoParticipantsOnScreen: 25,
      participantName: userName,
      managedLayoutOptions: {
        layoutMode: "grid",
        screenPublisherContainer: "screenSharingContainer",
        speakerHighlightEnabled: true,
      },
    });
    startRoomListeners();
    if (videoFilter && videoFilter.filterName && videoFilter.filterPayload) {
      publisherOptionsRef.current = Object.assign({}, publisherOptions, {
        style: {
          buttonDisplayMode: "off",
          nameDisplayMode: "auto",
          audioLevelDisplayMode: "off",
        },
        name: userName,
        showControls: true,
        videoFilter: parseVideoFilter(videoFilter),
      });
    } else {
      publisherOptionsRef.current = Object.assign({}, publisherOptions, {
        style: {
          buttonDisplayMode: "off",
          nameDisplayMode: "auto",
          audioLevelDisplayMode: "off",
        },
        name: userName,
        showControls: true,
      });
    }

    console.log("[useRoom] - finalPublisherOptions", publisherOptionsRef.current);
    roomRef.current
      .join({ publisherProperties: publisherOptionsRef.current })
      .then(() => {
        setConnected(true);
        setCamera(roomRef.current.camera);
        setScreen(roomRef.current.screen);
        addLocalParticipant({ room: roomRef.current });
      })
      .catch((e) => console.log(e));
  }, []);

  return {
    createCall,
    connected,
    camera: camera,
    screen: screen,
    room: roomRef.current,
    participants,
    networkStatus,
    publisherIsSpeaking,
    cameraPublishing,
    localParticipant,
  };
}
