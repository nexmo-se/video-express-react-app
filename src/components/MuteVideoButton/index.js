import { useCallback } from 'react';
import VideocamIcon from '@material-ui/icons/Videocam';

export default function MuteVideoButton({ toggleVideo }) {
  return (
    <button className="buttons" onClick={toggleVideo}>
      Toggle Video
    </button>
  );
}
