import React from 'react';
import ChatInput from '../ChatInput';
import styles from './styles';
import useSignal from '../../hooks/useSignal';
import useRoom from '../../hooks/useRoom';
import { StylesContext } from '@material-ui/styles';

const Chat = ({ room }) => {
  const [chatMessages, setChatMessages] = React.useState([]);
  React.useEffect(() => {}, [room]);
  const { sendSignal } = useSignal({ room });

  const sendMessage = text => {
    console.log('sending signal');
    if (room) sendSignal(text, 'text');
    // setText('');
  };

  const classes = styles();
  return (
    <div className={classes.chatInput}>
      <ChatInput sendMessage={sendMessage}></ChatInput>
    </div>
  );
};

export default Chat;
