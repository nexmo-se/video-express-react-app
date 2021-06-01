import VoiceOverOffIcon from '@material-ui/icons/VoiceOverOff';
import { IconButton } from '@material-ui/core';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';

export default function muteAllButton({ handleMuteAll, areAllMuted }) {
  return (
    // <button className="buttons" onClick={handleMuteAll}>
    //   Mute all
    // </button>

    <IconButton
      edge="start"
      color="inherit"
      aria-label="videoCamera"
      onClick={handleMuteAll}
    >
      {areAllMuted ? (
        <RecordVoiceOverIcon fontSize="inherit" />
      ) : (
        <VoiceOverOffIcon fontSize="inherit" />
      )}
    </IconButton>
  );
}
