import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import useScreenSharing from '../../hooks/useScreenSharing';

export default function ScreenSharingButton({ classes, room }) {
  const {
    isScreenSharing,
    startScreenSharing,
    stopScreenSharing
  } = useScreenSharing({ room });

  const handleScreenSharing = () => {
    isScreenSharing ? stopScreenSharing() : startScreenSharing();
  };

  const title = isScreenSharing ? 'Stop Screensharing' : 'Start Screensharing';

  return (
    <Tooltip title={title} aria-label="add">
      <IconButton
        variant="primary"
        edge="start"
        color="inherit"
        aria-label="mic"
        onClick={handleScreenSharing}
        className={`${classes.toolbarButtons} ${
          isScreenSharing ? classes.activeButton : ''
        }`}
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
