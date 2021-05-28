import React, { useState, useRef, useCallback } from 'react';

export function useRoom() {
  let roomRef = useRef(null);
  const [camera, setCamera] = useState(null);
  const [screen, setScreen] = useState(null);
  const [connected, setConnected] = useState(false);
  const [participants, setParticipants] = useState([]);

  const addparticipants = ({ participant }) => {
    setParticipants(prev => [...prev, participant]);
  };

  const removeparticipants = ({ participant }) => {
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

  const createCall = useCallback(({ apikey, sessionId, token }) => {
    if (!apikey || !sessionId || !token) {
      throw new Error('Check your credentials');
    }

    const MP = window.MP;
    roomRef.current = new MP.Room({
      apiKey: apikey,
      sessionId: sessionId,
      token: token,
      roomContainer: 'roomContainer',
      useLayoutManager: true,
      managedLayoutOptions: {
        cameraPublisherContainer: 'roomContainer',
        screenPublisherContainer: 'roomContainer'
      }
    });
    console.log('this is the room' + roomRef);
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
    roomRef.current.on('participantJoined', participant => {
      //   addParticipant();
      addparticipants({ participant: participant });
      console.log('Room: participant joined: ', participant);
    });
    roomRef.current.on('participantLeft', (participant, reason) => {
      removeparticipants({ participant: participant });
      console.log('Room: participant left', participant, reason);
    });

    roomRef.current
      .join({
        publisherProperties: { name: 'John', style: { nameDisplayMode: 'on' } }
      })
      .then(() => {
        setConnected(true);
        setCamera(roomRef.current.camera);
        setScreen(roomRef.current.screen);
      })
      .catch(e => console.log(e));
  }, []);

  return {
    createCall,
    connected: connected,
    camera: camera,
    room: roomRef.current,
    participants
  };
}
