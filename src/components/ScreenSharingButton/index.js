import { useState } from 'react';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

export default function ScreenSharingButton({ classes, room }) {
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
        // const screen = room.screen;
        room.screen.on('started', () => {
          console.log('The screen sharing has started!');
        });
        room.screen.on('stopped', () => {
          console.log('Room.ScreenPublisher - stopped');
        });
        setScreenSharing(true);
      } catch (e) {
        console.log(e);
      }
      //   setScreen(room.screen);
    }
  };

  return (
    <Tooltip title="Screen sharing" aria-label="add">
      <IconButton
        variant="primary"
        edge="start"
        color="inherit"
        aria-label="mic"
        onClick={handleScreenSharing}
        className={classes.toolbarButtons}
      >
        {isScreenSharing ? (
          <StopScreenShare fontSize="inherit" />
        ) : (
          <ScreenShare fontSize="inherit" />
        )}
      </IconButton>
    </Tooltip>
  );
}
