import React from 'react';
import { useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function ListLayOutOptions({ room }) {
  const [value, setValue] = React.useState('Grid');

  const handleChange = event => {
    console.log(event.target.value);
    setValue(event.target.value);
    if (room) {
      console.log(room);
      room.setLayoutMode(event.target.value);
    }
  };
  return (
    <div>
      {/* <h3 id="simple-modal-title">Change Layout</h3> */}

      <FormControl component="fieldset">
        <FormLabel component="legend">Layout</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange}
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
      {/* <h4>Active Speaker</h4>
      <h4>Grid</h4> */}
    </div>
  );
}
