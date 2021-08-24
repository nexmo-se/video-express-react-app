import { IconButton } from '@material-ui/core';

import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MoreIcon from '@material-ui/icons/More';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import HouseIcon from '@material-ui/icons/House';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import React from 'react';
import styles from './styles';

import Drawer from '@material-ui/core/Drawer';

import SideMenu from '../SideMenu';

import useSignal from '../../hooks/useSignal';

export default function MoreOptionsButton({
  classes,
  participants,
  room,
  localParticipant
}) {
  const { listOfMessages } = useSignal({ room });
  const titleToolTip = 'More options';
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
        >
          <MoreVertIcon fontSize="inherit" />
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
