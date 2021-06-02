import { useCallback } from 'react';
import VideoCam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  /* margin: {
    margin: theme.spacing(1),
    borderRadius: '5em',
    height: '60px',
  }, */
}));

export default function MuteVideoButton({ hasVideo, toggleVideo }) {
  const classes = useStyles();
  return (
    <IconButton
      edge="start"
      color="#fff"
      aria-label="videoCamera"
      onClick={toggleVideo}
      className={classes.margin}
    >
      {hasVideo ? <VideocamOff /> : <VideoCam />}
    </IconButton>
  );
}
