import React from 'react';
import styles from './styles';
import { useEffect } from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';
import RouterIcon from '@material-ui/icons/Router';
import Snackbar from '@material-ui/core/Snackbar';

export default function NetworkToast({ networkStatus }) {
  const [open, setOpen] = React.useState(Boolean(networkStatus));
  const classes = styles({ networkStatus });

  const getIcon = () => {
    if (networkStatus === 'reconnected') {
      return (
        <CheckCircleOutlineIcon
          className={classes.networkStatusIcons}
          fontSize="default"
        />
      );
    }
    if (networkStatus === 'reconnecting') {
      return (
        <RouterIcon className={classes.networkStatusIcons} fontSize="default" />
      );
    }
    return (
      <SignalWifiOffIcon
        className={classes.networkStatusIcons}
        fontSize="default"
      />
    );
  };

  const handleClose = reason => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setOpen(Boolean(networkStatus));
  }, [networkStatus]);

  return (
    <div>
      <Snackbar
        className={classes.anchorOriginTopCenter}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        ContentProps={{
          classes: {
            root: classes.root,
            action: classes.action
          }
        }}
        open={open}
        onClose={handleClose}
        message={
          <div className={classes.snackBarContent}>
            {getIcon()}
            {networkStatus === 'reconnecting'
              ? 'You are disconnected. Please check your internet connection'
              : `You have been ${networkStatus}`}
          </div>
        }
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
          // </div>
        }
      />
    </div>
  );
}
