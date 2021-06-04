import { useState } from 'react';
import { startRecording, stopRecording } from '../../api/fetchRecording';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { IconButton } from '@material-ui/core';
import styles from './styles';
import Tooltip from '@material-ui/core/Tooltip';

export default function RecordingButton({ classes, room }) {
  const [isRecording, setRecording] = useState(false);
  const [archiveId, setArchiveId] = useState(null);
  const localClasses = styles();

  const handleRecordingStart = async (sessionId) => {
    console.log('starting to record');
    try {
      const data = await startRecording(sessionId);
      if (data.status === 200 && data.data) {
        const { archiveId } = data.data;
        setArchiveId(archiveId);
        setRecording(true);
      }
    } catch (e) {
      console.log(e);
      setRecording(false);
      //todo handle error
    }
  };

  const handleRecordingStop = async (archiveId) => {
    console.log('stopping the recording');
    console.log(archiveId);
    try {
      if (isRecording) {
        const data = await stopRecording(archiveId);
        if (data.status === 200 && data.data) {
          const { status } = data.data;
          console.log(archiveId, status);
          setRecording(false);
        }
        // todo what happens here?
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

  return (
    <Tooltip title="Recording" aria-label="add">
      <IconButton
        edge="start"
        color="inherit"
        aria-label="mic"
        onClick={handleRecordingAction}
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
  );
}
