import { IconButton } from '@material-ui/core';
import { useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Modal from '@material-ui/core/Modal';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListLayOutOptions from 'components/ListLayoutOptions';

const options = ['None', 'Atria'];

const ITEM_HEIGHT = 48;

export default function settingsButton({ classes, room }) {
  const [modalStyle] = useState(getModalStyle);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }

  const handleOpen = () => {
    setOpenModal(true);
    handleClose();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <ListLayOutOptions room={room} />
    </div>
  );

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleOpen}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Typography variant="inherit">Change layout</Typography>
        </MenuItem>
        <div>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </div>

        <MenuItem onClick={handleOpen}>
          <ListItemIcon>
            <SettingsVoiceIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Change Audio Source</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <VideoCallIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Change Video Source</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
