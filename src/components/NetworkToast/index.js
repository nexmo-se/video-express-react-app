import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import styles from './styles';
import { useEffect, useState } from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';
import RouterIcon from '@material-ui/icons/Router';

export default function NetworkToast({ networkStatus }) {
  const [open, setOpen] = React.useState(true);
  const classes = styles();

  useEffect(() => {
    setOpen(true);
  }, [networkStatus]);

  const getIcon = () => {
    if (networkStatus === 'reconnected') {
      return <CheckCircleOutlineIcon fontSize="inherit" />;
    }
    if (networkStatus === 'reconnecting') {
      return <RouterIcon fontSize="inherit" />;
    }
    return <SignalWifiOffIcon fontSize="inherit" />;
  };

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          icon={getIcon()}
          onClose={() => {
            setOpen(false);
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity={networkStatus === 'disconnected' ? 'error' : 'info'}
        >
          {networkStatus === 'reconnecting'
            ? 'We are working to reconnect you'
            : `You have been ${networkStatus}`}
        </Alert>
      </Collapse>
    </div>
  );
}
