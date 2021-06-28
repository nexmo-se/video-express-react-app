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

  // const [value, setValue] = React.useState('Grid');

  // const handleChange = event => {
  //   console.log(event.target.value);
  //   setValue(event.target.value);
  //   if (room) {
  //     console.log(room);
  //     room.setLayoutMode(event.target.value);
  //   }
  // };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {/* <ListLayOutOptions room={room} /> */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Layout</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value="perro"
          // onChange={handleChange}
        >
          <FormControlLabel value="grid" control={<Radio />} label="Grid" />
          <FormControlLabel
            value="active-speaker"
            control={<Radio />}
            label="Active Speaker"
          />
          {/* <FormControlLabel value="other" control={<Radio />} label="Other" />
        <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
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

      {/* <h3 id="simple-modal-title">Change Layout</h3> */}

      {/* <h4>Active Speaker</h4>
      <h4>Grid</h4> */}
    </div>
  );
}
