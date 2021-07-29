import VoiceOverOffIcon from '@material-ui/icons/VoiceOverOff';
import { IconButton } from '@material-ui/core';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Tooltip from '@material-ui/core/Tooltip';

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
      >
        {areAllMuted ? (
          <RecordVoiceOverIcon fontSize="inherit" />
        ) : (
          <VoiceOverOffIcon fontSize="inherit" />
        )}
      </IconButton>
    </Tooltip>
  );
}
