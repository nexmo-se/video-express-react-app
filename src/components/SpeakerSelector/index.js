import SpeakerIcon from '@material-ui/icons/Speaker';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

import useDevices from '../../hooks/useDevices';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import React from 'react';
import styles from './styles.js';

export default function SpeakerSelector({
  classes,
  cameraPublishing,
  changeAudioOutput,
  getCurrentAudioOutput,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const localClasses = styles();
  const ITEM_HEIGHT = 48;

  const { deviceInfo } = useDevices();
  const [devicesAvailable, setDevicesAvailable] = React.useState(null);
  const [options, setOptions] = React.useState([]);

  const open = Boolean(anchorEl);
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
    const audioOutputId = devicesAvailable.find(
      (device) => device.label === event.target.textContent
    ).deviceId;
    changeAudioOutput(audioOutputId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Tooltip title="Change Audio Output">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          className={classes.toolbarButtons}
          onClick={handleClick}
        >
          <SpeakerIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '40ch',
          },
        }}
      >
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
      </Menu>
    </div>
  );
}
