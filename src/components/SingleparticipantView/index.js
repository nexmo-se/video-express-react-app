import React, { useState, useRef } from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import styles from './styles';
import useCopyMeetingUrl from '../../hooks/useCopyMeetingUrl';

export default function SingleParticipantView({ roomName }) {
  const { copyUrl } = useCopyMeetingUrl();

  const classes = styles();
  // const [copiedMeetingUrl, setCopiedMeetingUrl] = useState(false);
  const [title, setTitle] = React.useState('Copy');

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setTitle('Copied');
    copyUrl();
  };
  const handleClose = () => {
    setOpen(false);
    //DELAYING THE title change as otherwise it's visible for the user
    setTimeout(() => {
      setTitle('Copy');
    }, 500);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.banner}>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <div className={classes.flexCentered}>
            <EmojiEmotionsIcon style={{ fontSize: 100 }}></EmojiEmotionsIcon>
          </div>
          <p>
            Waiting for other participants. You can invite them by<br></br>
            sharing this meeting link.
          </p>
          <TextField
            variant="outlined"
            value={window.location.href}
            InputProps={{
              readOnly: true,
              className: classes.textField
            }}
            InputLabelProps={{
              classes: classes.textField
            }}
            fullWidth={true}
          />
        </CardContent>
        <CardActions>
          <Tooltip
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            title={title}
          >
            <Button
              edge="end"
              color="primary"
              variant="contained"
              onClick={handleClick}
            >
              Copy meeting URL
            </Button>
          </Tooltip>
        </CardActions>
      </Card>
    </div>
  );
}
