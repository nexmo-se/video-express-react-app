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
import useCopyMeetingUrl from '../../hooks/useCopyMeetingUrl';

export default function InfoIconButton({ classes }) {
  const { copyUrl } = useCopyMeetingUrl();
  const localClasses = styles();
  const [state, setState] = React.useState(false);
  const [title, setTitle] = React.useState('Copy');

  const toggleDrawer = () => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState(!state);
  };

  const titleToolTip = 'Meeting Info';

  const handleClick = () => {
    setTitle('Copied');
    copyUrl();
  };

  const handleClose = () => {
    setTimeout(() => {
      setTitle('Copy');
    }, 500);
  };

  return (
    <div>
      <Tooltip
        // className={localClasses.toolTip}
        title={titleToolTip}
        aria-label="add"
      >
        <IconButton
          onClick={toggleDrawer()}
          edge="start"
          color="inherit"
          aria-label="mic"
          className={localClasses.infoButton}
        >
          <InfoIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Drawer open={state} onClose={toggleDrawer(false)}>
        <List className={localClasses.list}>
          <div className={localClasses.container}>
            <Typography className={localClasses.header} variant="h5">
              Joining info
            </Typography>
            <ListItem>{window.location.href}</ListItem>
            <Tooltip title={title} onClose={handleClose} aria-label="add">
              <Button
                onClick={handleClick}
                variant="contained"
                color="primary"
                className={localClasses.button}
                endIcon={<FileCopyIcon>send</FileCopyIcon>}
              >
                Copy URL
              </Button>
            </Tooltip>

            <Divider />
          </div>
        </List>
      </Drawer>
    </div>
  );
}
