import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import withStyles from '@mui/styles/withStyles';

export default function LayoutOptions({
  handleLayOutChange,
  open,
  handleCloseLayout,
  anchorElLayout
}) {
  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5'
    }
  })(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles(theme => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white
        }
      }
    }
  }))(MenuItem);

  return (
    <div>
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorElLayout}
        keepMounted
        open={open}
        onClose={handleCloseLayout}
      >
        <StyledMenuItem
          onClick={() => {
            handleLayOutChange('grid');
          }}
        >
          Grid
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            handleLayOutChange('active-speaker');
          }}
        >
          Active Speaker
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
