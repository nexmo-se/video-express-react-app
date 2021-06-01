import { useState } from 'react';
import style from './index.css';

import MuteAudioButton from 'components/MuteAudioButton';
import MuteVideoButton from 'components/MuteVideoButton';
import RecordingButton from 'components/RecordingButton';
import MuteAll from 'components/MuteAllButton';
import ScreenSharingButton from 'components/ScreenSharingButton';

export default function ToolBar({ room, participants }) {
  return (
    <div id="layoutcontrol">
      <MuteVideoButton room={room} />
      <MuteAudioButton room={room} />
      <RecordingButton room={room} />
      <ScreenSharingButton room={room} />
      <MuteAll participants={participants} />
    </div>
  );
}
