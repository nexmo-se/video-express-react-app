import React from 'react';

import Mic from '@material-ui/icons/Mic';
import Switch from '@material-ui/core/Switch';

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
