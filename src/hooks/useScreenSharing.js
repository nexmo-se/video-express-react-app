import { useState, useCallback } from 'react';

export default function useScreenSharing({ room }) {
  const [screen, setScreen] = useState(null);
  const [isScreenSharing, setIsScreenSharing] = useState(null);

  const startScreenSharing = useCallback(async () => {
    if (room) {
      try {
        const { screen } = room;
        /* setIsScreenSharing(true); */
        screen.on('started', () => {
          console.log('[useScreensharing] -  The screen sharing has started!');
          setScreen(screen);
          setIsScreenSharing(true);
        });
        screen.on('stopped', (reason) => {
          console.log(
            '[useScreensharing] - The screen sharing stopped because: ',
            reason
          );
          setScreen(null);
          setIsScreenSharing(false);
        });
        screen.on('accessDenied', (reason) => {
          console.log('[useScreensharing] - Access Denied', reason);
          setScreen(null);
          setIsScreenSharing(false);
        });
        await room.startScreensharing();
        console.log('[startScreensharing]- ', screen);
      } catch (e) {
        console.log('[useScreensharing] - startScreenSharing error:', e);
      }
    }
  }, [room]);

  const stopScreenSharing = useCallback(async () => {
    console.log('[startScreensharing]- ', room);
    if (room) {
      room.stopScreensharing();
      setIsScreenSharing(false); // todo this is a temporary fix because the event are not being triggered
    }
  }, [room]);

  return {
    screen,
    isScreenSharing,
    startScreenSharing,
    stopScreenSharing
  };
}
