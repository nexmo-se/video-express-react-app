// import style from './index.css';
import { useState } from 'react';
import VideocamIcon from '@material-ui/icons/Videocam';
import { startRecording, stopRecording } from '../../api/fetchRecording';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { IconButton } from '@material-ui/core';

export default function RecordingButton({ room }) {
  const [isRecording, setRecording] = useState(false);
  const [archiveId, setArchiveId] = useState(null);

  const handleRecordingStart = async (sessionId) => {
    console.log('starting to record');
    try {
      const data = await startRecording(sessionId);
      if (data.status === 200 && data.data) {
        const { archiveId, status } = data.data;
        console.log(archiveId, status);
        setArchiveId(archiveId);
        setRecording(true);
      }
    } catch (e) {
      console.log(e);
      //todo handle error
    }
  };

  const handleRecordingStop = async (archiveId) => {
    console.log('stopping the recording');
    console.log(archiveId);
    if (isRecording) {
      try {
        const data = await stopRecording(archiveId);
        if (data.status === 200 && data.data) {
          const { status } = data.data;
          console.log(archiveId, status);
          setRecording(false);
        }
      } catch (e) {
        console.log(e);
      }
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
    <IconButton
      edge="start"
      color="inherit"
      aria-label="mic"
      onClick={handleRecordingAction}
    >
      {isRecording ? (
        <RadioButtonCheckedIcon fontSize="inherit" />
      ) : (
        <RadioButtonUncheckedIcon fontSize="inherit" />
      )}
    </IconButton>
  );
}
