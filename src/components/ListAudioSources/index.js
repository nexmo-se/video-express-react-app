import React from 'react';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Modal from '@mui/material/Modal';

export default function ListLayOutOptions({
  openModal,
  classes,
  handleCloseModal
}) {
  const [modalStyle] = useState(getModalStyle);

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

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Layout</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value="perro">
          <FormControlLabel value="Mic 1" control={<Radio />} label="Mic 1" />
          <FormControlLabel value="Mic 2" control={<Radio />} label="Mic 2" />
        </RadioGroup>
      </FormControl>
    </div>
  );
  return (
    <div>
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
    </div>
  );
}
