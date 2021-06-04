import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

export default function EndCallIcon({ classes, handleEndCall }) {
  return (
    <Tooltip title="End call" aria-label="add">
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
    </Tooltip>
  );
}
