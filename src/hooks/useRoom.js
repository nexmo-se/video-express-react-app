import React, { useState, useRef, useCallback } from 'react';

export function useRoom() {
  let roomRef = useRef(null);
  const [camera, setCamera] = useState(null);
  const [screen, setScreen] = useState(null);
  const [connected, setConnected] = useState(false);
  const [participants, setParticipants] = useState([]);

  const addParticipants = ({ participant }) => {
    setParticipants((prev) => [...prev, participant]);
  };

  const removeParticipants = ({ participant }) => {
    setParticipants((prev) =>
      prev.filter((prevparticipant) => prevparticipant.id !== participant.id)
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

  const createCall = useCallback(
    (roomContainer, { apikey, sessionId, token }) => {
      if (!apikey || !sessionId || !token) {
        throw new Error('Check your credentials');
      }
      console.log('createCall', roomContainer);
      const MP = window.MP;
      roomRef.current = new MP.Room({
        apiKey: apikey,
        sessionId: sessionId,
        token: token,
        roomContainer: roomContainer,
        useLayoutManager: true,
        /* managedLayoutOptions: {
          cameraPublisherContainer: 'layoutContainer',
          screenPublisherContainer: 'layoutContainer',
        }, */
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
        console.log('Room: disconnected');
      });
      roomRef.current.on('participantJoined', (participant) => {
        //   addParticipant();
        addParticipants({ participant: participant });
        console.log('Room: participant joined: ', participant);
      });
      roomRef.current.on('participantLeft', (participant, reason) => {
        removeParticipants({ participant: participant });
        console.log('Room: participant left', participant, reason);
      });
      const publisherProperties = {};
      if (process.env.NODE_ENV === 'development') {
        publisherProperties.videoSource = null;
      }
      roomRef.current
        .join({ publisherProperties })
        .then(() => {
          setConnected(true);
          setCamera(roomRef.current.camera);
          setScreen(roomRef.current.screen);
        })
        .catch((e) => console.log(e));
    },
    []
  );

  return {
    createCall,
    connected: connected,
    camera: camera,
    room: roomRef.current,
    participants,
  };
}
