import React from 'react';

import Videocam from '@mui/icons-material/Videocam';
import Switch from '@mui/material/Switch';

const VideoSettings = React.memo(({ hasVideo, onVideoChange, className }) => {
  return (
    <div className={className}>
      <Videocam />
      <div>Video</div>
      <Switch checked={hasVideo} onChange={onVideoChange} name="VideoToggle" />
    </div>
  );
});

export default VideoSettings;
