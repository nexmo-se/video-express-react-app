import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

export default function MuteAudioButton({
  toggleAudio,
  hasAudio,
  classes,
  publisherIsSpeaking,
}) {
  const title = hasAudio ? 'Disable Microphone' : 'Enable Microphone';
  return (
    <Tooltip title={title} aria-label="add">
      {/* <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab> */}

      <IconButton
        edge="start"
        color="inherit"
        aria-label="mic"
        onClick={toggleAudio}
        className={`${classes.toolbarButtons} ${
          !hasAudio ? classes.disabledButton : ''
        }
          ${hasAudio && publisherIsSpeaking ? classes.activeButtonIcon : ''}
        `}
      >
        {!hasAudio ? (
          <MicOffIcon fontSize="inherit" />
        ) : (
          <MicIcon fontSize="inherit" />
        )}
      </IconButton>
    </Tooltip>
  );
}
