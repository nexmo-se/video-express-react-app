import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';

export default function LayoutOptions({
  handleLayOutChange,
  open,
  handleCloseLayout,
  anchorElLayout
}) {
  let [selected, setSelected] = useState(true);

  const handleClick = layout => {
    setSelected(!selected);
    handleLayOutChange(layout);
  };

  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={anchorElLayout}
        keepMounted
        open={open}
        onClose={handleCloseLayout}
      >
        <MenuItem
          selected={selected}
          onClick={() => {
            handleClick('grid');
          }}
        >
          Grid
        </MenuItem>
        <MenuItem
          selected={!selected}
          onClick={() => {
            handleClick('active-speaker');
          }}
        >
          Active Speaker
        </MenuItem>
      </Menu>
    </div>
  );
}
