import ScreenShare from '@mui/icons-material/ScreenShare';
import StopScreenShare from '@mui/icons-material/StopScreenShare';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

export default function ScreenSharingButton({
  classes,
  isScreenSharing,
  startScreenSharing,
  stopScreenSharing
}) {
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
        size="large">
        {isScreenSharing ? (
          <StopScreenShare fontSize="inherit" />
        ) : (
          <ScreenShare fontSize="inherit" />
        )}
      </IconButton>
    </Tooltip>
  );
}
