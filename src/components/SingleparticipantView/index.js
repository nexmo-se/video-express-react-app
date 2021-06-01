import React, { useState, useRef } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import styles from './styles';

export default function SingleParticipantView({ roomName }) {
  const urlRef = useRef();
  const classes = styles();
  const [copiedMeetingUrl, setCopiedMeetingUrl] = useState(false);

  const getMeetingUrl = () => {
    return window.location.href;
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
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
        setOpen((prev) => !prev);
        console.log('Copy successfully');
      },
      () => {
        console.log('Copy failed');
      }
    );
  };
  return (
    <div className={classes.banner}>
      <Card className={classes.centeredFlex} variant="outlined">
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
                Copy Meeting Link
                {open ? (
                  <div className={classes.acCopySuccess}>Copied</div>
                ) : null}
              </Button>
            </div>
          </ClickAwayListener>
        </CardActions>
      </Card>
    </div>
  );
}
