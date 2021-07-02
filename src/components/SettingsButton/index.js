import { IconButton } from '@material-ui/core';
import { useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LayoutOptions from 'components/LayoutOptions';
import ListAudioSources from 'components/ListAudioSources';

const ITEM_HEIGHT = 48;

export default function settingsButton({ classes, room }) {
  // const [modalStyle] = useState(getModalStyle);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorElLayout, setAnchorElLayout] = useState(null);
  const openSubMenu = Boolean(anchorElLayout);

  const handleOpen = () => {
    setOpenModal(true);
    handleClose();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLayout = (event) => {
    setAnchorElLayout(event.currentTarget);
  };

  const handleCloseLayout = () => {
    setAnchorElLayout(null);
    setAnchorEl(null);
  };

  const handleLayOutChange = (layout) => {
    if (room) {
      room.setLayoutMode(layout);
    }
  };

  return (
    <div>
      <Tooltip title="Options">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          className={classes.toolbarButtons}
          onClick={handleClick}
        >
          <MoreVertIcon />
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
            width: '40ch'
          }
        }}
      >
        <MenuItem onClick={handleClickLayout}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Typography variant="inherit">Change layout</Typography>
        </MenuItem>
        {/* <div> */}
        <LayoutOptions
          room={room}
          handleCloseLayout={handleCloseLayout}
          handleLayOutChange={handleLayOutChange}
          open={openSubMenu}
          anchorElLayout={anchorElLayout}
        />
        {/* </div> */}

        {/* <MenuItem onClick={handleOpen}>
          <ListItemIcon>
            <SettingsVoiceIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Change Audio Source</Typography>
        </MenuItem>
        <ListAudioSources
          handleCloseModal={handleCloseModal}
          openModal={openModal}
          classes={classes}
        />
        <MenuItem>
          <ListItemIcon>
            <VideoCallIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Change Video Source</Typography>
        </MenuItem> */}
      </Menu>
    </div>
  );
}
