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
    }
    return <SignalWifiOffIcon fontSize="inherit" />;
  };
  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          icon={
            networkStatus === 'reconnected' ? (
              <CheckCircleOutlineIcon fontSize="inherit" />
            ) : (
              <SignalWifiOffIcon fontSize="inherit" />
            )
          }
          //   onClose={() => {
          //     setOpen(false);
          //   }}
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
          //   severity="error"
          //   {networkStatus  ===  'reconnected' ? severity="info" : severity="error"}
          severity={networkStatus === 'reconnected' ? 'info' : 'error'}
          //   color="info"
        >
          You have been {networkStatus}
        </Alert>
      </Collapse>
    </div>
  );
}
