import React from 'react';
import ChatInput from '../ChatInput';
import styles from './styles';
import useSignal from '../../hooks/useSignal';
import ChatMessages from '../ChatMessages';

const Chat = ({ room, listOfMessages }) => {
  const { sendSignal } = useSignal({ room });

  const sendMessage = text => {
    console.log('sending signal');
    if (room) sendSignal(text, 'text');
  };

  const classes = styles();

  return (
    <div className={classes.chatMessages}>
      <ChatMessages
        chatClass={classes.chatMessages}
        chatMessages={listOfMessages}
      ></ChatMessages>
      <div className={classes.chatInput}>
        <ChatInput sendMessage={sendMessage}></ChatInput>
      </div>
    </div>
  );
};

export default Chat;
