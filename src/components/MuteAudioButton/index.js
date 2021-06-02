import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import { IconButton } from '@material-ui/core';

export default function MuteAudioButton({ toggleAudio, hasAudio }) {
  return (
    // <button className="buttons" onClick={toggleAudio}>
    //   Toggle Audio
    // </button>
    <IconButton
      edge="start"
      color="inherit"
      aria-label="mic"
      onClick={toggleAudio}
    >
      {hasAudio ? (
        <MicOffIcon fontSize="inherit" />
      ) : (
        <MicIcon fontSize="inherit" />
      )}
    </IconButton>
  );
}
