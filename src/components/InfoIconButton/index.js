import { IconButton } from '@material-ui/core';
// import styles from './styles';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

import React from 'react';
import styles from './styles';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function InfoIconButton({ classes }) {
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

  const title = 'Meeting Info';

  return (
    <Tooltip title={title} aria-label="add">
      <div>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="mic"
          className={classes.toolbarButtons}
        >
          <InfoIcon fontSize="inherit" onClick={toggleDrawer()} />
        </IconButton>
        <Drawer open={state} onClose={toggleDrawer(false)}>
          <List className={localClasses.list}>
            <ListItem>Copy URL</ListItem>
            <Divider />
            <ListItem>Participants</ListItem>
          </List>
        </Drawer>
      </div>
    </Tooltip>
  );
}
