import { useCallback } from 'react';
import VideoCam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import { IconButton } from '@material-ui/core';

export default function MuteVideoButton({ hasVideo, toggleVideo }) {
  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="videoCamera"
      onClick={toggleVideo}
    >
      {hasVideo ? (
        <VideocamOff fontSize="inherit" />
      ) : (
        <VideoCam fontSize="inherit" />
      )}
    </IconButton>
  );
}
