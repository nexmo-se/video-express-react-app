import React from 'react';

import Mic from '@mui/icons-material/Mic';
import Switch from '@mui/material/Switch';

const AudioSettings = ({ hasAudio, onAudioChange, className }) => {
  return (
    <div className={className}>
      <Mic />
      <div>Microphone</div>
      <Switch checked={hasAudio} onChange={onAudioChange} name="AudioToggle" />
    </div>
  );
};

export default AudioSettings;
