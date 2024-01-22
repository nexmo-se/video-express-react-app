import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

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
        size="large">
        <ExitToAppIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
}
