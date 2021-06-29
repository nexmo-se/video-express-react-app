import React, { useState, useRef, useCallback } from 'react';
import _ from 'lodash';

export default function useRoom() {
  let roomRef = useRef(null);
  const [camera, setCamera] = useState(null);
  const [screen, setScreen] = useState(null);
  const [connected, setConnected] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [networkStatus, setNetworkStatus] = useState(null);
  const [publisherIsSpeaking, setPublisherIsSpeaking] = useState(false);

  const addParticipants = ({ participant }) => {
    setParticipants(prev => [...prev, participant]);
  };

  const removeParticipants = ({ participant }) => {
    setParticipants(prev =>
      prev.filter(prevparticipant => prevparticipant.id !== participant.id)
    );
  };

  // const onConnected = useCallback(
  //   // roomRef.current.on('connected', () => {
  //   console.log(
  //     'Room.CameraPublisher - connected viniendo de donde tiene que venir'
  //   ),
  //   // }),
  //   []
  // );

  //   const onParticipantJoined = useCallback(
  //     // roomRef.current.on('connected', () => {
  //     console.log('Room.CameraPublisher - participant joined'),
  //     // }),
  //     []
  //   );

  //   const onStreamCreated = useCallback(
  //     // roomRef.current.on('connected', () => {
  //     console.log('Room.CameraPublisher - stream created'),
  //     // }),
  //     []
  //   );

  //   const onDisconnected = useCallback(
  //     // roomRef.current.on('connected', () => {
  //     console.log('Room.CameraPublisher - disconnected'),
  //     // }),
  //     []
  //   );

  const onAudioLevel = React.useCallback(audioLevel => {
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
    /* setLogLevel(Math.min(Math.max(currentLogLevel, 0), 1) * 100); */
  }, []);

  const addPublisherCameraEvents = () => {
    if (roomRef.current.camera) {
      roomRef.current.camera.on(
        'audioLevelUpdated',
        _.throttle(event => onAudioLevel(event), 250)
      );
    }
  };

  const createCall = useCallback(
    (
      { apikey, sessionId, token },
      roomContainer,
      userName,
      publisherOptions
    ) => {
      if (!apikey || !sessionId || !token) {
        throw new Error('Check your credentials');
      }

      const MP = window.MP;
      roomRef.current = new MP.Room({
        apiKey: apikey,
        sessionId: sessionId,
        token: token,
        roomContainer: 'roomContainer',
        //useLayoutManager: true,
        managedLayoutOptions: {
          layoutMode: 'grid',
          cameraPublisherContainer: 'roomContainer',
          screenPublisherContainer: 'roomContainer'
        }
      });
      // const connectionEventHandlers = {
      //   connected: onConnected
      //   // disconnected: onDisconnected,
      //   // participantJoined: onParticipantJoined
      //   //streamDestroyed: onStreamDestroyed
      // };
      // if (roomRef.current) {
      //   roomRef.current.on({
      //     connected: onConnected
      //   });
      // }

      //   const streamEventHandlers = {
      //     created: onStreamCreated

      //     //streamDestroyed: onStreamDestroyed
      //   };
      roomRef.current.on('connected', () => {
        console.log('Room: connected');
      });
      roomRef.current.on('disconnected', () => {
        setNetworkStatus('disconnected');
        console.log('Room: disconnected');
      });
      roomRef.current.on('activeSpeakerChanged', participant => {
        console.log('Active speaker changed', participant);
      });

      roomRef.current.on('reconnected', () => {
        setNetworkStatus('reconnected');
        console.log('Room: reconnected');
      });
      roomRef.current.on('reconnecting', () => {
        setNetworkStatus('reconnecting');
        console.log('Room: reconnecting');
      });
      roomRef.current.on('participantJoined', participant => {
        //   addParticipant();
        addParticipants({ participant: participant });
        console.log('Room: participant joined: ', participant);
      });
      roomRef.current.on('participantLeft', (participant, reason) => {
        removeParticipants({ participant: participant });
        console.log('Room: participant left', participant, reason);
      });
      const finalPublisherOptions = Object.assign({}, publisherOptions, {
        style: {
          buttonDisplayMode: 'off',
          nameDisplayMode: 'auto',
          audioLevelDisplayMode: 'off'
        },
        name: userName,
        showControls: true
      });
      console.log('[useRoom] - finalPublisherOptions', finalPublisherOptions);
      roomRef.current
        .join({ publisherProperties: finalPublisherOptions })
        .then(() => {
          setConnected(true);
          setCamera(roomRef.current.camera);
          setScreen(roomRef.current.screen);
          addPublisherCameraEvents();
        })
        .catch(e => console.log(e));
    },
    []
  );

  return {
    createCall,
    connected,
    camera: camera,
    screen: screen,
    room: roomRef.current,
    participants,
    networkStatus,
    publisherIsSpeaking
    /*     startScreenSharing,
    stopScreenSharing, */
  };
}
