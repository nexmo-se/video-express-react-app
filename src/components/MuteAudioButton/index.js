import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

import useDevices from '../../hooks/useDevices';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import React from 'react';
import styles from './styles.js';

export default function MuteAudioButton({
  toggleAudio,
  hasAudio,
  classes,
  getAudioSource,
  cameraPublishing,
  changeAudioSource,
}) {
  const title = hasAudio ? 'Disable Microphone' : 'Enable Microphone';
  const localClasses = styles();

  const { deviceInfo } = useDevices();
  const [devicesAvailable, setDevicesAvailable] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [audioDeviceId, setAudioDeviceId] = React.useState('');

  React.useEffect(() => {
    setDevicesAvailable(deviceInfo.audioInputDevices);

    if (cameraPublishing && devicesAvailable) {
      getAudioSource().then((id) => setAudioDeviceId(id));

      const indexOfSelectedElement = devicesAvailable.indexOf(
        devicesAvailable.find((e) => e.deviceId === audioDeviceId)
      );

      setSelectedIndex(indexOfSelectedElement);
    }
  }, [
    cameraPublishing,
    getAudioSource,
    deviceInfo,
    audioDeviceId,
    devicesAvailable,
  ]);

  React.useEffect(() => {
    if (devicesAvailable) {
      const audioDevicesAvailable = devicesAvailable.map((e) => {
        return e.label;
      });
      setOptions(audioDevicesAvailable);
    }
  }, [devicesAvailable]);

  const handleChangeAudioSource = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    const audioDeviceId = devicesAvailable.find(
      (device) => device.label === event.target.textContent
    ).deviceId;
    changeAudioSource(audioDeviceId);
  };

  const handleToggle = (e) => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        disableElevation
        className={classes.groupButton}
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Tooltip title={title} aria-label="add">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="mic"
            onClick={toggleAudio}
            className={`${classes.arrowButton} ${
              !hasAudio ? classes.disabledButton : ''
            }
        `}
          >
            {!hasAudio ? (
              <MicOffIcon fontSize="inherit" />
            ) : (
              <MicIcon fontSize="inherit" />
            )}
          </IconButton>
        </Tooltip>
        <IconButton
          // color="secondary"
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          className={classes.arrowButton}
        >
          <ArrowDropDownIcon />
        </IconButton>
      </ButtonGroup>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleChangeAudioSource(event, index)}
                      classes={{ selected: localClasses.selected }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
