import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MoreIcon from '@material-ui/icons/More';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import HouseIcon from '@material-ui/icons/House';

import React from 'react';
import styles from './styles';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import useCopyMeetingUrl from '../../hooks/useCopyMeetingUrl';

export default function InfoIconButton() {
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

  const ListItemLink = props => {
    return <ListItem button component="a" {...props} />;
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
      <Tooltip title={titleToolTip} aria-label="add">
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
            <Typography className={localClasses.header} variant="h5">
              App info
            </Typography>
            <ListItem>
              <ListItemIcon>
                <MoreIcon variant="contained" color="primary" />
              </ListItemIcon>
              <ListItemText
                className={localClasses.versionLabel}
                primary={`Version ` + process.env.REACT_APP_VERSION}
              />
            </ListItem>
            <ListItem className={localClasses.listItem}>
              <ListItemIcon>
                <HouseIcon variant="contained" color="primary" />
              </ListItemIcon>
              <ListItemLink
                href="https://github.com/nexmo-se/video-api-multiparty-sdk-sample-app"
                target="_blank"
              >
                <ListItemText primary="Source code" />
              </ListItemLink>
            </ListItem>
            <ListItem className={localClasses.listItem}>
              <ListItemIcon>
                <ChildFriendlyIcon variant="contained" color="primary" />
              </ListItemIcon>
              <ListItemLink
                href="https://www.npmjs.com/package/@vonage/multiparty"
                target="_blank"
              >
                <ListItemText primary="npm Toolkit" />
              </ListItemLink>
            </ListItem>
            <Divider />
          </div>
        </List>
      </Drawer>
    </div>
  );
}
