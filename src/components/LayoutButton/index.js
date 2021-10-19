import { IconButton } from '@material-ui/core';
import { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import styles from './styles';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Typography from '@material-ui/core/Typography';

const ITEM_HEIGHT = 48;

export default function LayoutButton({ classes, room }) {
  const localClasses = styles();
  const [layOut, setLayOut] = useState('grid');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLayOutChange = () => {
    if (room) {
      if (layOut === 'grid') {
        room.setLayoutMode('active-speaker');
        setLayOut('active-speaker');
      } else {
        room.setLayoutMode('grid');
        setLayOut('grid');
      }
    }
  };

  return (
    <div>
      <Tooltip title="Change Layout">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          className={classes.toolbarButtons}
          onClick={handleClick}
        >
          <DashboardIcon />
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
        <MenuItem
          className={layOut === 'grid' ? localClasses.choosen : null}
          onClick={handleLayOutChange}
        >
          <Typography variant="inherit">Grid</Typography>
        </MenuItem>
        <MenuItem
          className={layOut === 'active-speaker' ? localClasses.choosen : null}
          onClick={handleLayOutChange}
        >
          <Typography variant="inherit">Active Speaker</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
