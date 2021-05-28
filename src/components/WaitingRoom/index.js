import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, TextField } from '@material-ui/core';
import useStyles from './styles';

export default function WaitingRoom() {
  const classes = useStyles();
  const { push } = useHistory();
  const waitingRoomVideoContainer = useRef();
  const [roomName, setRoomName] = useState(null);

  const handleJoinClick = () => {
    // todo room name
    if (!roomName) {
      return;
    }
    push(`room/${roomName}`);
  };

  const onChangeRoomName = (e) => {
    const roomName = e.target.value;
    setRoomName(roomName);
  };

  return (
    <div className={classes.waitingRoomContainer}>
      <Grid container direction="column" justify="center" alignItems="center">
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="room-name"
            label="Room Name"
            name="roomName"
            autoComplete="Room Name"
            autoFocus
            helperText={roomName === '' ? 'Empty field!' : ' '}
            value={roomName}
            onChange={onChangeRoomName}
          />
        </form>
        <div
          id="waiting-room-video-container"
          className={classes.waitingRoomVideoPreview}
          ref={waitingRoomVideoContainer}
        ></div>
      </Grid>
      <Grid container direction="column" justify="center" alignItems="center">
        <Button variant="contained" color="primary" onClick={handleJoinClick}>
          Join Call
        </Button>
      </Grid>
    </div>
  );
}
