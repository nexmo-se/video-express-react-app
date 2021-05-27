import React, { useState, useRef } from 'react';
import style from '../SingleparticipantView/index.css';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 'auto'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function SingleParticipantView({ roomName }) {
  const urlRef = useRef();
  const [copiedMeetingUrl, setCopiedMeetingUrl] = useState(false);

  const getMeetingUrl = () => {
    return window.location.href;
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  //Maybe use a ref instead
  const copyUrl = () => {
    //https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        setOpen(prev => !prev);
        console.log('Copy successfully');
      },
      () => {
        console.log('Copy failed');
      }
    );
  };
  const classes = useStyles();
  return (
    <div id="banner">
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <p>Waiting for other participants</p>
          <p ref={urlRef}>{window.location.href}</p>
        </CardContent>
        <CardActions>
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.root}>
              <Button
                edge="end"
                color="primary"
                variant="contained"
                style={{ marginLeft: '50px' }}
                onClick={copyUrl}
              >
                Copy link to meeting
                {open ? <div className="ac-copy-success">Copied</div> : null}
              </Button>
            </div>
          </ClickAwayListener>
          {/* <Button
            edge="end"
            color="primary"
            variant="contained"
            style={{ marginLeft: '50px' }}
            onClick={copyUrl}
          >
            Copy link to meeting
            <div
              style={{ display: copiedMeetingUrl ? 'block' : 'none' }}
              className="ac-copy-success"
            >
              Copied
            </div>
          </Button> */}
        </CardActions>
      </Card>
    </div>
  );
}
