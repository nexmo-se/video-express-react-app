import SpeakerIcon from '@material-ui/icons/Speaker';
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

export default function SpeakerButton({
  classes,
  getAudioSource,
  cameraPublishing,
  changeAudioOutput,
  getCurrentAudioOutput,
}) {
  const title = 'Change audio output';
  const localClasses = styles();

  const { deviceInfo } = useDevices();
  const [devicesAvailable, setDevicesAvailable] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [audioOutputId, setAudioOutputId] = React.useState('');

  React.useEffect(() => {
    setDevicesAvailable(deviceInfo.audioOutputDevices);

    if (cameraPublishing && devicesAvailable) {
      getCurrentAudioOutput().then((id) => setAudioOutputId(id));

      const indexOfSelectedElement = devicesAvailable.indexOf(
        devicesAvailable.find((e) => e.deviceId === audioOutputId)
      );

      setSelectedIndex(indexOfSelectedElement);
    }
  }, [
    cameraPublishing,
    deviceInfo,
    audioOutputId,
    devicesAvailable,
    getCurrentAudioOutput,
  ]);

  React.useEffect(() => {
    if (devicesAvailable) {
      const audioOutputsAvailable = devicesAvailable.map((e) => {
        return e.label;
      });
      setOptions(audioOutputsAvailable);
    }
  }, [devicesAvailable]);

  const handleChangeAudioOutput = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    const audioOutputId = devicesAvailable.find(
      (device) => device.label === event.target.textContent
    ).deviceId;
    changeAudioOutput(audioOutputId);
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
            className={`${classes.arrowButton}`}
          >
            <SpeakerIcon />
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
                      onClick={(event) => handleChangeAudioOutput(event, index)}
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
