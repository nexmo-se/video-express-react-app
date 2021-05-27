import React, { useState, useRef, useCallback } from 'react';

export function useRoom({ apikey, sessionId, token }) {
  const roomRef = useRef(null);
  const [camera, setCamera] = useState(null);
  const [connected, setconnected] = useState(false);
  const [participantsCount, setParticipantsCount] = useState(0);

  //   const addParticipant = () => setParticipantsCount(participantsCount + 1);

  const removeParticipant = () => setParticipantsCount(participantsCount - 1);

  //   const onConnected = useCallback(
  //     // roomRef.current.on('connected', () => {
  //     console.log('Room.CameraPublisher - connected'),
  //     // }),
  //     []
  //   );

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

    //   const connectionEventHandlers = {
    //     connected: onConnected,
    //     // disconnected: onDisconnected,
    //     participantJoined: onParticipantJoined
    //     //streamDestroyed: onStreamDestroyed
    //   };
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
      setParticipantsCount(prevCount => prevCount + 1);
      console.log('Room: participant joined: ', participant);
      console.log(participantsCount);
    });
    roomRef.current.on('participantLeft', (participant, reason) => {
      console.log('Room: participant left', participant, reason);
      setParticipantsCount(prevCount => prevCount - 1);
    });
    // roomRef.current.on('connected', () => {
    //         console.log('Room.CameraPublisher - participant joined'),
    // })

    roomRef.current
      .join()
      .then(() => {
        setconnected(true);
        // console.log(roomRef.current);
        // roomRef.current.on(connectionEventHandlers);
        setCamera(roomRef.current.camera);
        //   camera.on(streamEventHandlers);
      })
      .catch(e => console.log(e));
  }, []);

  return {
    createCall,
    participantsCount: participantsCount,
    connected: connected
  };
}
