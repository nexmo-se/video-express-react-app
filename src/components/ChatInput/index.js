import React from 'react';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import styles from './styles';

const ChatInput = ({ sendMessage }) => {
  const classes = styles();
  const [text, setText] = React.useState('');

  const onKeyDown = (e) => {
    // e.preventDefault();
    if (e.keyCode === 13) {
      e.preventDefault();
      sendMessage(text);
      setText('');
    }
  };

  const changeText = (event) => {
    // console.log(event.target.value);
    setText(event.target.value);
  };
  
  return (
    <>
      <form className={classes.wrapForm} noValidate autoComplete="off">
        <TextField
          onChange={changeText}
          onKeyDown={onKeyDown}
          id="standard-text"
          label="Chat"
          className={classes.wrapText}
          value={text}
        />
        <Button
          onClick={() => {
            sendMessage(text);
            setText('');
          }}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          <SendIcon />
        </Button>
      </form>
    </>
  );
};
export default ChatInput;
