import { useCallback } from 'react';
import VideoCam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

export default function MuteVideoButton({ classes, hasVideo, toggleVideo }) {
  return (
    <Tooltip title="Toggle video" aria-label="add">
      <IconButton
        edge="start"
        aria-label="videoCamera"
        onClick={toggleVideo}
        className={classes.toolbarButtons}
      >
        {hasVideo ? <VideocamOff /> : <VideoCam />}
      </IconButton>
    </Tooltip>
  );
}
