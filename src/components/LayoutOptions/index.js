import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { withStyles } from '@material-ui/core/styles';

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
