import React from 'react';

import Videocam from '@material-ui/icons/Videocam';
import Switch from '@material-ui/core/Switch';

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
