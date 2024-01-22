import { IconButton } from '@mui/material';

import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreIcon from '@mui/icons-material/More';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import HouseIcon from '@mui/icons-material/House';

import ChatIcon from '@mui/icons-material/Chat';

import React from 'react';
import styles from './styles';

import Drawer from '@mui/material/Drawer';

import SideMenu from '../SideMenu';

import useSignal from '../../hooks/useSignal';

export default function MoreOptionsButton({
  classes,
  participants,
  room,
  localParticipant
}) {
  const { listOfMessages } = useSignal({ room });
  const titleToolTip = 'Chat';
  const localClasses = styles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = () => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState(!state);
  };

  return (
    <div>
      <Tooltip title={titleToolTip} aria-label="add">
        <IconButton
          onClick={toggleDrawer()}
          edge="start"
          color="inherit"
          aria-label="mic"
          className={localClasses.infoButton}
          size="large">
          <ChatIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Drawer
        open={state}
        onClose={toggleDrawer(false)}
        classes={{ paper: localClasses.paper }}
      >
        <SideMenu
          className={localClasses.root}
          room={room}
          participants={participants}
          localParticipant={localParticipant}
          listOfMessages={listOfMessages}
        ></SideMenu>
      </Drawer>
    </div>
  );
}
