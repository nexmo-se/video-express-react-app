import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

export default function ExitButton({ room }) {
  const { roomName } = useParams();
  const { push } = useHistory();
  const exitFunction = () => {
    if (room) {
      push(`${roomName}/${room.roomId}/end`);
    }
  };
  return (
    <IconButton
      edge="start"
      // color="inherit"
      aria-label="videoCamera"
      onClick={exitFunction}
    >
      <ExitToAppIcon></ExitToAppIcon>
    </IconButton>
  );
}
