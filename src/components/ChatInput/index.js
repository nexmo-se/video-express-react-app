import React from 'react';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
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
