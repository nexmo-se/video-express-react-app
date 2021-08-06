import React from 'react';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import styles from './styles';

const ChatInput = ({ sendMessage }) => {
  const classes = styles();
  return (
    <>
      <form className={classes.wrapForm} noValidate autoComplete="off">
        <TextField
          id="standard-text"
          label="Chat"
          className={classes.wrapText}
          //margin="normal"
        />
        <Button
          onClick={sendMessage}
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
