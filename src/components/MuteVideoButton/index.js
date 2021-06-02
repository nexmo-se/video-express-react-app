import { useCallback } from 'react';
import VideoCam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import { IconButton } from '@material-ui/core';

export default function MuteVideoButton({ classes, hasVideo, toggleVideo }) {
  return (
    <IconButton
      edge="start"
      color="#fff"
      aria-label="videoCamera"
      onClick={toggleVideo}
      className={classes.toolbarButtons}
    >
      {hasVideo ? <VideocamOff /> : <VideoCam />}
    </IconButton>
  );
}
