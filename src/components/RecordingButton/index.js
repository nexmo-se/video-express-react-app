import { useState } from 'react';
import { startRecording, stopRecording } from '../../api/fetchRecording';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Button, IconButton } from '@material-ui/core';
import styles from './styles';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import useRecording from '../../hooks/useRecording';

export default function RecordingButton({ classes, room }) {
  /* const [isRecording, setRecording] = useState(false); */
  const [archiveId, setArchiveId] = useState(null);
  const localClasses = styles();
  const [open, setOpen] = useState(false);
  const { isRecording, sendRecordingSignal } = useRecording({ room });

  const handleRecordingStart = async (sessionId) => {
    console.log('starting to record');
    try {
      const data = await startRecording(sessionId);
      if (data.status === 200 && data.data) {
        const { archiveId } = data.data;
        setArchiveId(archiveId);
        sendRecordingSignal({ data: { isRecording: true } });
        handleClose();
      }
    } catch (e) {
      console.log(e);
      /* setRecording(false); */
    }
  };

  const handleRecordingStop = async (archiveId) => {
    console.log('stopping the recording');
    console.log(archiveId);
    try {
      if (isRecording) {
        const data = await stopRecording(archiveId);
        if (data.status === 200 && data.data) {
          sendRecordingSignal({ data: { isRecording: false } });
          /* setRecording(false); */
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleRecordingAction = () => {
    if (room) {
      const sessionId = room.roomId;
      isRecording
        ? handleRecordingStop(archiveId)
        : handleRecordingStart(sessionId);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const title = isRecording ? 'Stop Recording' : 'Start Recording';

  return (
    <>
      <Tooltip title={title} aria-label="add">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="mic"
          onClick={handleClickOpen}
          className={classes.toolbarButtons}
        >
          {isRecording ? (
            <FiberManualRecordIcon
              fontSize="inherit"
              className={localClasses.activeRecordingIcon}
              style={{ color: '#D50F2C' }}
            />
          ) : (
            <FiberManualRecordIcon fontSize="inherit" />
          )}
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {isRecording
            ? 'Do you want to stop the recording?'
            : "You're about to start recording"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isRecording
              ? 'The recording will be available in the end call page'
              : 'Make sure all participants consent to being recorded'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleRecordingAction}
            color="primary"
            variant="contained"
            autoFocus
          >
            Start Recording
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
