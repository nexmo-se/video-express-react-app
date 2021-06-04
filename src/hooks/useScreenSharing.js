import { useState, useCallback } from 'react';

export default function useScreenSharing({ room }) {
  const [screen, setScreen] = useState(null);
  const [isScreenSharing, setIsScreenSharing] = useState(null);

  const startScreenSharing = useCallback(async () => {
    if (room) {
      try {
        await room.startScreensharing();
        const { screen } = room;
        console.log('[startScreensharing]- ', screen);
        screen.on('started', () => {
          console.log('The screen sharing has started!');
          setScreen(screen);
          setIsScreenSharing(true);
        });
        screen.on('stopped', (reason) => {
          console.log('The screen sharing stopped because: ', reason);
          setScreen(null);
          setIsScreenSharing(false);
        });
        screen.on('accessDenied', (reason) => {
          console.log('[useScreensharing] - Access Denied', reason);
          setScreen(null);
          setIsScreenSharing(false);
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [room]);

  const stopScreenSharing = useCallback(async () => {
    console.log('[startScreensharing]- ', room);
    if (room) {
      room.stopScreensharing();
    }
  }, [room]);

  return {
    screen,
    isScreenSharing,
    startScreenSharing,
    stopScreenSharing,
  };
}
