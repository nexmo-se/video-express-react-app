import { IconButton } from '@material-ui/core';
// import styles from './styles';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import React from 'react';
import styles from './styles';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useCopyMeetingUrl from '../../hooks/useCopyMeetingUrl';

export default function InfoIconButton({ classes }) {
  const { copyUrl } = useCopyMeetingUrl();
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
            <div>
              <Typography variant="h5">Joining info</Typography>
              <ListItem>{window.location.href}</ListItem>

              <Button
                onClick={copyUrl}
                variant="contained"
                color="primary"
                className={localClasses.button}
                endIcon={<FileCopyIcon>send</FileCopyIcon>}
              >
                Copy URL
              </Button>

              <Divider />
            </div>
          </List>
        </Drawer>
      </div>
    </Tooltip>
  );
}
