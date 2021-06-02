import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton } from '@material-ui/core';

export default function EndCallIcon({ classes, handleEndCall }) {
  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="videoCamera"
      className={classes.toolbarButtons}
      style={{ backgroundColor: '#D50F2C' }}
      onClick={handleEndCall}
    >
      <ExitToAppIcon fontSize="inherit" />
    </IconButton>
  );
}
