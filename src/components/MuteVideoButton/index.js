import VideoCam from "@mui/icons-material/Videocam";
import VideocamOff from "@mui/icons-material/VideocamOff";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import useDevices from "../../hooks/useDevices";

import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import React from "react";
import styles from "./styles.js";
import { UserContext } from "../../context/UserContext";

export default function MuteVideoButton({ classes, hasVideo, toggleVideo, getVideoSource, cameraPublishing, changeVideoSource }) {
  const title = hasVideo ? "Disable Camera" : "Enable Camera";
  const { deviceInfo } = useDevices();
  const [devicesAvailable, setDevicesAvailable] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const localClasses = styles();
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    setDevicesAvailable(deviceInfo.videoInputDevices);
    if (cameraPublishing) {
      const currentDeviceId = getVideoSource()?.deviceId;

      const IndexOfSelectedElement = devicesAvailable.indexOf(devicesAvailable.find((e) => e.deviceId === currentDeviceId));
      setSelectedIndex(IndexOfSelectedElement);
    }
    return () => {
      setDevicesAvailable(null);
      setSelectedIndex(0);
    };
  }, [cameraPublishing, getVideoSource, deviceInfo, devicesAvailable]);

  React.useEffect(() => {
    if (devicesAvailable) {
      const videoDevicesAvailable = devicesAvailable.map((e) => {
        return e.label;
      });
      setOptions(videoDevicesAvailable);
    }
    // if (user.videoEffects.backgroundBlur)
    //   setOptions(['Not available with Background Blurring']);
    return () => {
      setOptions([]);
    };
  }, [devicesAvailable]);

  const handleChangeVideoSource = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    const videoDeviceId = devicesAvailable.find((device) => device.label === event.target.textContent).deviceId;
    changeVideoSource(videoDeviceId);
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
      <ButtonGroup className={classes.groupButton} disableElevation variant="contained" ref={anchorRef} aria-label="split button">
        <Tooltip title={title} aria-label="add">
          <IconButton
            onClick={toggleVideo}
            edge="start"
            aria-label="videoCamera"
            size="small"
            className={`${classes.arrowButton} ${!hasVideo ? classes.disabledButton : ""}`}
          >
            {!hasVideo ? <VideocamOff /> : <VideoCam />}
          </IconButton>
        </Tooltip>
        <IconButton
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
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
        style={{ zIndex: 101 }} // todo temporary fix for a bug in MP 0.1.5
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleChangeVideoSource(event, index)}
                      classes={{
                        selected: localClasses.selected,
                        root: localClasses.root,
                      }}
                      // disabled={user.videoEffects.backgroundBlur}
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
