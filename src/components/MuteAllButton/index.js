import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import { IconButton } from '@mui/material';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import Tooltip from '@mui/material/Tooltip';

export default function muteAllButton({ handleMuteAll, areAllMuted, classes }) {
  const title = areAllMuted ? 'Unmute Participants' : 'Mute Participants';
  return (
    <Tooltip title={title} aria-label="add">
      <IconButton
        edge="start"
        color="inherit"
        aria-label="videoCamera"
        onClick={handleMuteAll}
        className={classes.toolbarButtons}
        size="large">
        {areAllMuted ? (
          <RecordVoiceOverIcon fontSize="inherit" />
        ) : (
          <VoiceOverOffIcon fontSize="inherit" />
        )}
      </IconButton>
    </Tooltip>
  );
}
