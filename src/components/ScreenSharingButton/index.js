import { useState } from 'react';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import { IconButton } from '@material-ui/core';

export default function ScreenSharingButton({ room }) {
  const [isScreenSharing, setScreenSharing] = useState(false);

  const handleScreenSharing = () => {
    isScreenSharing ? stopScreenSharing() : startScreenSharing();
  };

  const stopScreenSharing = () => {
    if (isScreenSharing) {
      room.stopScreensharing();
      setScreenSharing(false);
    }
  };
  const startScreenSharing = async () => {
    if (room) {
      try {
        await room.startScreensharing();
        setScreenSharing(true);
      } catch (e) {
        console.log(e);
      }
      //   setScreen(room.screen);
    }
  };

  return (
    <IconButton
      variant="primary"
      edge="start"
      color="inherit"
      aria-label="mic"
      onClick={handleScreenSharing}
    >
      {isScreenSharing ? (
        <StopScreenShare fontSize="inherit" />
      ) : (
        <ScreenShare fontSize="inherit" />
      )}
    </IconButton>
  );
}
