import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { IconButton } from '@material-ui/core';

export default function ExitButton({ exitFunction }) {
  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="videoCamera"
      onClick={exitFunction}
    >
      <ExitToAppIcon></ExitToAppIcon>
    </IconButton>
  );
}
