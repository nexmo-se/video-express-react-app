import React from 'react';
import { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Modal from '@material-ui/core/Modal';

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
